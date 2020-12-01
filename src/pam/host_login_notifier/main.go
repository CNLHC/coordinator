package main

import (
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/shimt/go-simplecli"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"github.com/valyala/fasthttp"
)

var cli = simplecli.NewCLI()

func init() {
	viper.SetDefault("hooks_url", "https://coordinator.cnworkshop.xyz/hooks/pam")
	viper.SetDefault("token", "test_token")
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("/etc/notifier/")

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			// Config file not found; ignore error if desired
		} else {
			// Config file was found but another error was produced
		}
	}

}

type Json map[string]interface{}

var PAM_ENV = []string{
	"PAM_RHOST",
	"PAM_RUSER",
	"PAM_SERVICE",
	"PAM_TTY",
	"PAM_USER",
	"PAM_TYPE",
}

func main() {

	fmt.Printf("hello")
	var resp Json = make(Json)
	if cli.ConfigFile != "" {
		fmt.Println("Using config file:", cli.ConfigFile)
	}
	if hn, err := os.Hostname(); err == nil {
		resp["host"] = hn
	} else {
		resp["host"] = ""
	}
	resp["token"] = viper.Get("token").(string)

	for _, env := range PAM_ENV {
		resp[env] = os.Getenv(env)
	}

	http_req := fasthttp.AcquireRequest()
	resp_bytes, _ := json.Marshal(resp)
	http_req.SetBody(resp_bytes)
	http_req.Header.SetMethodBytes([]byte("POST"))
	http_req.Header.SetContentType("application/json")
	http_req.SetRequestURI(viper.Get("hooks_url").(string))
	http_res := fasthttp.AcquireResponse()

	if err := fasthttp.DoTimeout(http_req, http_res, time.Second*1); err != nil {
		logrus.WithField("err", err.Error()).Error("can not send request")
	}

	cli.Exit(0)
}
