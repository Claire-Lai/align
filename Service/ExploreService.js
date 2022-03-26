class ExploreService {
  constructor(knex) {
    this.knex = knex;
  }

  async allFinders() {
    console.log(`FinderPreviewService's allFinder method was called`);
    try {
      let allFinders = await this.knex
        .select("finder_id", "finder_name")
        .from("finder");
      return allFinders;
    } catch (error) {
      console.log(error);
    }
  }
  // Claire added this
  async allSeekers() {
    console.log(`SeekerPreviewService's allSeeker method was called`);
    try {
      let allSeekers = await this.knex
        .select("seeker_id", "seeker_name")
        .from("seeker");
      return allSeekers;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = ExploreService;
