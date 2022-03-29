// ================ Setting up and editting seeker Profile ==================

class SeekerProfileService {
  constructor(knex) {
    this.knex = knex;
  }

  async listprofile(seekerId) {
    console.log(`listprofile method called with seekerId: ${seekerId}`);
    let profile = [];
    if (typeof seekerId !== "undefined") {
      try {
        let seekerInfo = await this.knex
          .select("*")
          .from("seeker")
          .fullOuterJoin(
            "seeker_contact",
            "seeker.seeker_id",
            "seeker_contact.seeker_id"
          )
          .where("seeker.seeker_id", seekerId);
        profile.push(seekerInfo[0]);
        if (seekerInfo.length == 1) {
          let seekerCustom = await this.knex
            .select("*")
            .from("seeker_customfield")
            .where("seeker_customfield.seeker_id", seekerId);
          profile.push(seekerCustom);
        }
        if (seekerInfo.length == 1) {
          let seekerEducation = await this.knex
            .select("*")
            .from("seeker_education")
            .where("seeker_education.seeker_id", seekerId);
          profile.push(seekerEducation);
        }
        if (seekerInfo.length == 1) {
          let seekerExperience = await this.knex
            .select("*")
            .from("seeker_experience")
            .where("seeker_experience.seeker_id", seekerId);
          profile.push(seekerExperience);
          return profile;
        } else {
          console.log("Unknown seeker");
        }
      } catch (error) {
        console.log("error reading profile from database: " + error);
      }
    }
  }

  async addProfile(seekerProfileInfo, seekerId) {
    console.log(
      `addProfile method called with seekerprofileInfo: ${seekerProfileInfo} and seekerId: ${seekerId}`
    );
    console.log(seekerProfileInfo);
    try {
      let seekerMain = await this.knex
        .select("*")
        .from("seeker")
        .where("seeker.seeker_id", seekerId);
      if (seekerMain.length === 0) {
        await this.knex
          .insert({
            seeker_id: seekerId,
            first_name: seekerProfileInfo.first_name,
            surname: seekerProfileInfo.surname,
          })
          .into("seeker");
      }
      let seekerContact = await this.knex
        .select("*")
        .from("seeker_contact")
        .where("seeker_contact.seeker_id", seekerId);
      if (seekerContact.length === 0) {
        await this.knex
          .insert({
            seeker_id: seekerId,
            mobile_number: seekerProfileInfo.mobile_number,
            home_number: seekerProfileInfo.home_number,
            email1: seekerProfileInfo.email1,
            links: seekerProfileInfo.link,
          })
          .into("seeker_contact");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addcustom(seekerCustom, seekerId) {
    console.log(
      `add method seeker called with info: ${seekerCustom},seekerId: ${seekerId}`
    );
    try {
      await this.knex
        .select("*")
        .from("seeker_customfield")
        .where("seeker_customfield.seeker_id", seekerId)
        .insert({
          seeker_id: seekerId,
          customfield_title: seekerCustom.infoTitle,
          customfield_content: seekerCustom.infoContent,
        })
        .into("seeker_customfield");
    } catch (error) {
      console.log(error);
    }
  }

  async updateProfile(seekerProfileInfo, seekerId) {
    console.log(seekerProfileInfo);
    console.log(
      `seeker updateProfile method called with info: ${seekerProfileInfo} and finderId: ${seekerId}`
    );
    try {
      let profile = await this.knex
        .select("*")
        .from("seeker")
        .fullOuterJoin(
          "seeker_contact",
          "seeker.seeker_id",
          "seeker_contact.seeker_id"
        )
        .where("seeker.seeker_id", seekerId);
      if (profile.length == 1) {
        await this.knex("seeker").where("seeker.seeker_id", seekerId).update({
          first_name: seekerProfileInfo.first_name,
          surname: seekerProfileInfo.surname,
        });
        await this.knex("seeker_contact")
          .where("seeker_contact.seeker_id", seekerId)
          .update({
            mobile_number: seekerProfileInfo.mobile_number,
            home_number: seekerProfileInfo.home_number,
            email1: seekerProfileInfo.email1,
            links: seekerProfileInfo.link,
          });
      } else {
        console.log(`Error: unable to find the correct seeker profile`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateCustom(customInfo, seekerId) {
    console.log(
      `updateCustom method called with customfieldId: ${customInfo} with seekerId: ${seekerId}`
    );
    for (let i = 0; i < customInfo.length; i++) {
      try {
        console.log(customInfo[i]);
        console.log(seekerId);
        console.log(customInfo[i].customfieldId);
        let customfields = await this.knex
          .select("*")
          .from("seeker_customfield")
          .where({
            seeker_id: seekerId,
            customfield_id: customInfo[i].customfieldId,
          });
        if (customfields.length == 1) {
          console.log(`inside the update query if`);
          await this.knex("seeker_customfield")
            .where({
              seeker_id: seekerId,
              customfield_id: customInfo[i].customfieldId,
            })
            .update({
              customfield_id: customInfo[i].customfieldId,
              customfield_title: customInfo[i].infoTitle,
              customfield_content: customInfo[i].infoContent,
            });
          console.log(`Here I am done`);
        } else {
          console.log(`Error: unable to update particular customfield`);
        }
        console.log(`done looping`);
      } catch (error) {
        console.log(`there is an error: ${error}`);
      }
    }
  }

  async removeCustom(customfield_Id, seekerId) {
    console.log(
      `removeCustom method called with customfield_id: ${customfield_Id} and seekerId: ${seekerId}`
    );
    try {
      let customfield = await this.knex
        .select("*")
        .from("seeker_customfield")
        .where({
          seeker_id: seekerId,
          customfield_id: customfield_Id,
        });
      if (customfield.length === 1) {
        return await this.knex("seeker_customfield")
          .where({
            seeker_id: seekerId,
            customfield_id: customfield_Id,
          })
          .del();
      } else {
        console.log(`error in selecting the correct customfield`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SeekerProfileService;
