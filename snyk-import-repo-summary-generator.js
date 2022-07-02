// import * as json from 'json';
// import * as core from '@actions/core';

const core = require("@actions/core");
var fs = require("fs");
const readline = require("readline");

var FILENAME,
  import_job_file,
  import_time,
  imported,
  is_imported,
  json_log,
  repo_name,
  result_file;
const summary_generator = async () => {
  try {
    FILENAME = "import-job-results.log";
    //   import_job_file = fs.readFileSync(FILENAME);
    const readInterface = readline.createInterface({
      input: fs.createReadStream(FILENAME),
      console: false,
    });
    data = []
    readInterface.on("line", function (line) {
      json_log = JSON.parse(line);
      if (json_log["logs"].length > 0) {
        repo_name = json_log["logs"][0]["name"];
        import_time = json_log["logs"][0]["created"];

        if (json_log["logs"][0]["projects"].length > 0) {
          is_imported = json_log["logs"][0]["projects"][0]["success"];
          // result_file.write(`${repo_name} repository is ${imported} imported on ${import_time}`);
          console.log(
            `${repo_name} repository is ${is_imported} imported on ${import_time} `
          );
          data.push([repo_name, (is_imported ? "yes": "no"), import_time])
        }
      }

      
    }).on('close', async function(){
      await core.summary
      .addHeading("Test Results")
      .addTable([
        [{ data: "Repository name", header: true }, { data: "Imported Status", header: true }, { data: "Time", header: true }],
        ...data
    ])
      .write();
    });

    
  } catch (e) {
    console.log(e);
  }
};

summary_generator();
