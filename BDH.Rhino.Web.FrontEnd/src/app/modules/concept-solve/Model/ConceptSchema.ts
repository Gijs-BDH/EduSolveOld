
export interface ConceptSchema {
    "bouwconceptId": string;

    "leftIsIndifferent": boolean;
    "emptySpaceAllowedLeft": boolean;
    "allowedLeft": string[];

    "rightIsIndifferent": boolean;
    "emptySpaceAllowedRight": boolean;
    "allowedRight": string[];

    "aboveIsIndifferent": boolean;
    "emptySpaceAllowedAbove": boolean;
    "allowedAbove": string[];

    "belowIsIndifferent": boolean;
    "allowedOnLowestLevel": boolean;
    "allowedBelow": string[];

    "columnSpan": number;
    "rowSpan": number;
}
