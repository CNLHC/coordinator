export interface IGrafanaHooks {
    dashboardId: number;
    evalMatches: EvalMatch[];
    message: string;
    orgId: number;
    panelId: number;
    ruleId: number;
    ruleName: string;
    ruleUrl: string;
    state: string;
    tags: Tags;
    title: string;
}

export interface EvalMatch {
    value: number;
    metric: string;
    tags: null;
}

export interface Tags {
}
