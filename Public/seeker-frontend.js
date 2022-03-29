// Handlebars template for Seeker Name
var seekerNameTemplate = Handlebars.compile(
  `<div class="impactSeekerDiv" id="impactSeekerName">
  {{profile.[0].first_name}} {{profile.[0].surname}}
</div>`
);

// Handlebars template for edit/create button on profile
var seekerProfileEditCreateTemplate =
  Handlebars.compile(`<div id="seekerEditCreate">
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="float:right;margin-right:5px;">
    {{#if profile.[0].first_name}}
    Edit
    {{else}}
    Create
{{/if}}
</button>   
{{/if}}
</div>`);

// Handlebars template for edit/create button in modal
var seekerProfileEditCreateModalTemplate =
  Handlebars.compile(`<div id="modalEditCreateProfile" class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
{{#if profile.[0].first_name}}
<button data-bs-dismiss="modal"  class="btn btn-primary" id="SaveSeekerProfileEdits">Save</button>
{{else}}
<button data-bs-dismiss="modal" class="btn btn-primary" id="CreateSeekerProfileEdits">Create</button>
{{/if}}
</div>`);

// Handlebars template for main profile info
var seekerProfileTemplate = Handlebars.compile(
  `
    <div class="profileInfo" id="SeekerInfo">
    <h2>Basic information</h2>
    <hr>
    <p style="display:inline-block;width:200px">Current Company: </p>
    {{profile.[0].current_company}}
    <br>
    <p style="display:inline-block;width:200px">Mobile:</p>
    {{profile.[0].mobile_number}}
    <br>
    <p style="display:inline-block;width:200px">Email:</p>
    {{profile.[0].email1}}
    </div>
    `
);

// Handlebars template for custom profile info button
var seekerCustomfieldButtonTemplate =
  Handlebars.compile(`<div id="seekerCustomEdit">
{{#if profile.[1]}}
<button type="button" class="editcustomseeker btn bg-light" data-bs-toggle="modal" data-bs-target="#modalCustomfieldsSeekerEdit">edit</button>
{{/if}}
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCustomfieldsSeeker" style="float:right;">
Add
</button> 
</div>`);

// Handlebars template for custom profile modal loop
var seekerCustomModalTemplate = Handlebars.compile(`
<div id="seekerModalCustom">
{{#each profile.[1]}}
<div class="customfieldSeekerdiv" data-id="{{customfield_id}}">
<label for="customeFill">
</label>
<input type="text" class="customFillTitleEditSeeker" name="customFillTitleEditSeeker" value="{{customfield_title}}">
 <br>
 <textarea type="text" class="customFillTitleEditSeeker" name="customFillTextEditSeeker" required>{{customfield_content}}</textarea>
 <button type="button" class="removecustomseeker btn bg-light" data-id="{{customfield_id}}">remove</button>
</div>
{{/each}}
</div>`);

// Handlebars template for custom profile info
var seekerProfileCustomfieldTemplate = Handlebars.compile(
  `{{#each profile.[1]}}
        <div style="margin-bottom:10px">
         <h4>{{customfield_title}}</h4>
         <p>{{customfield_content}}</p>
        </div>
    {{/each}}`
);

const reloadSeekerName = (profile) => {
  console.log(`reload seeker name function:`);
  console.log(profile);
  $("#impactSeekerName").html(seekerNameTemplate({ profile }));
};

const reloadSeekerEditCreate = (profile) => {
  $("#seekerEditCreate").html(seekerProfileEditCreateTemplate({ profile }));
};

const reloadSeekerEditCreateModal = (profile) => {
  $("#modalEditCreateProfile").html(
    seekerProfileEditCreateModalTemplate({ profile })
  );
};

const reloadSeekerCustomButton = (profile) => {
  $("#seekerCustomEdit").html(seekerCustomfieldButtonTemplate({ profile }));
};

const reloadSeekerCustomModal = (profile) => {
  $("#seekerModalCustom").html(seekerCustomModalTemplate({ profile }));
};

const reloadSeekerProfileInfo = (profile) => {
  console.log(`reload seeker profile function:`);
  console.log(profile);
  $("#SeekerInfo").html(seekerProfileTemplate({ profile }));
};

const reloadSeekerCustomInfo = (profile) => {
  $("#SeekerCustomField").html(seekerProfileCustomfieldTemplate({ profile }));
};

// event listeners for the buttons on the seeker profile page
$(() => {
  $(document).on("click", "#SaveSeekerProfileEdits", (e) => {
    console.log("Save button pressed");
    e.preventDefault();
    let seekerProfileInfo = {
      first_name: $("input[name=impactSeekerFirstName]").val(),
      surname: $("input[name=impactSeekerSurname]").val(),
      home_number: $("input[name=impactSeekerHomeNumber]").val(),
      mobile_number: $("input[name=impactSeekerMobileNumber]").val(),
      email1: $("input[name=impactSeekerEmail]").val(),
      link: $("input[name=impactSeekerLink]").val(),
    };
    axios
      .put("https://localhost:3000/api/seekerprofile", {
        seekerProfileInfo: seekerProfileInfo,
      })
      .then((res) => {
        reloadSeekerName(res.data);
        reloadSeekerProfileInfo(res.data);
        console.log(res.data);
      });
  });

  $(document).on("click", "#CreateSeekerProfileEdits", (e) => {
    console.log("Create button pressed");
    e.preventDefault();
    let seekerProfileInfo = {
      first_name: $("input[name=impactSeekerFirstName]").val(),
      surname: $("input[name=impactSeekerSurname]").val(),
      home_number: $("input[name=impactSeekerHomeNumber]").val(),
      mobile_number: $("input[name=impactSeekerMobileNumber]").val(),
      email1: $("input[name=impactSeekerEmail]").val(),
      link: $("input[name=impactSeekerLink]").val(),
    };
    axios
      .post("https://localhost:3000/api/newseekerprofile", {
        seekerProfileInfo: seekerProfileInfo,
      })
      .then((res) => {
        reloadSeekerName(res.data);
        reloadSeekerProfileInfo(res.data);
        reloadSeekerEditCreate(res.data);
        reloadSeekerEditCreateModal(res.data);
        console.log(res.data);
      });
  });

  $(document).on("click", "#SaveSeekerCustomField", (e) => {
    console.log("Save seeker customfield button pressed");
    e.preventDefault();
    let customSeekerAdd = {
      infoTitle: $("input[name=customfieldSeekerTitle]").val(),
      infoContent: $("textarea[name=customfieldSeekerContent]").val(),
    };
    console.log(customSeekerAdd);
    $("input[name=customfieldSeekerTitle]").val("");
    $("textarea[name=customfieldSeekerContent]").val("");
    axios
      .post("https://localhost:3000/api/newSeekerCustomfield", {
        customSeekerInfo: customSeekerAdd,
      })
      .then((res) => {
        reloadSeekerCustomInfo(res.data);
        reloadSeekerCustomButton(res.data);
        reloadSeekerCustomModal(res.data);
        console.log(res.data);
      });
  });

  $(document).on("click", "#editSeekerCustomField", (e) => {
    e.preventDefault();
    let infoArray = [];
    $(".customfieldSeekerdiv").each((i, obj) => {
      console.log(`this is obj: `, obj);
      let customEdit = {};
      customEdit.customfieldId = $(obj).data("id");
      customEdit.infoTitle = $(obj)
        .children("input[name=customFillTitleEditSeeker]")
        .val();
      customEdit.infoContent = $(obj)
        .children("textarea[name=customFillTextEditSeeker]")
        .val();
      infoArray.push(customEdit);
    });
    console.log(infoArray);
    axios
      .put("https://localhost:3000/api/editSeekerCustomfield", {
        customInfo: infoArray,
      })
      .then((res) => {
        reloadSeekerCustomInfo(res.data);
        reloadSeekerCustomButton(res.data);
        reloadSeekerCustomModal(res.data);
        console.log(res.data);
      });
  });
  $(document).on("click", ".removecustomseeker", (e) => {
    e.preventDefault();
    let divId = $(event.target).data("id");
    console.log(divId);
    axios
      .delete(`https://localhost:3000/api/deleteSeekerCustomfield/${divId}`)
      .then((res) => {
        reloadSeekerCustomInfo(res.data);
        reloadSeekerCustomButton(res.data);
        reloadSeekerCustomModal(res.data);
        console.log(res.data);
        $(`div[data-id=${divId}]`).remove();
      });
  });
});