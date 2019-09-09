export interface PathEntry {
    type: number;
    name: string;
    value: string;
    options: string[];
}

export class Route {
    natLibrary: string;
    natProgram: string;
    login: boolean;
    loglevel: string;
    active: boolean;
}

export class RouteTemplate {
    template: String;
    route: Route;
    entries: PathEntry[];
}

