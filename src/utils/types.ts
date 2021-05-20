export interface DeployFunction {
    name: string;
    baseDir: string;
    schedule?: string;
}

export interface LogFunctionRequest {
    name: string;
    tail: number;
    follow: boolean;
}

export interface GetFunctionResponse {
    image: string;
    name: string;
    invocationCount: number;
    replicas: number;
    availableReplicas: number;
}
export interface Resource {
    memory: string;
    cpu: string;
}

export interface Function {
    image: string;
    name: string;
    invocationCount: number;
    replicas: number;
    availableReplicas: number;
}

export interface ListFunctionResponse {
    nextPageToken: string;
    functions: Function[];
}

export interface ListFunctionRequest {
    pageSize: number;
    pageToken: string;
    view: number;
}