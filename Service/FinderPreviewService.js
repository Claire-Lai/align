class FinderPreviewService {
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
}
module.exports = FinderPreviewService;
