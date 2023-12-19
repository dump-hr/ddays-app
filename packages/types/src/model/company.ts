export enum SponsorCategory {
    General = "general",
    Gold = "gold",
    Silver = "silver",
    Bronze = "bronze",
    Workshop = "workshop",
    FoodAndBeverage = "foodAndBeverage",
    GeneralMedia = "generalMedia",
    Media = "media",
    Organizational = "organizational",
    PrizeGame = "prizeGame",
    Friend = "friend",
} 
 
export type Company = {
    id: number;
    name?: string;
    description?: string;
    sponsorCategory: SponsorCategory;
    websiteUrl?: string;
    boothLocation?: string;
    codeId?: number;
}
