// import * as json from 'json';
// import * as core from '@actions/core';

const json = require('json')
const core = require('@actions/core')
var fs = require ('fs');

var FILENAME, import_job_file, import_time, imported, is_imported, json_log, repo_name, result_file;
const summary_generator = async () =>{
try {
  FILENAME = "import-job-results.log";
  import_job_file = fs.readFileSync(FILENAME);
  // result_file = fs.open("result.txt", "w");

  for (var log, _pj_c = 0, _pj_a = import_job_file, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    log = _pj_a[_pj_c];
    json_log = JSON.parse(log);

    if (json_log["logs"].length > 0) {
      repo_name = json_log["logs"][0]["name"];
      import_time = json_log["logs"][0]["created"];

      if (json_log["logs"][0]["projects"].length > 0) {
        is_imported = json_log["logs"][0]["projects"][0]["success"];
        imported = is_imported ? "successfully" : "not successfully";
        // result_file.write(`${repo_name} repository is ${imported} imported on ${import_time}`);
        console.log(`${repo_name} repository is ${imported} imported on ${import_time} `);
      }
    }

    await core.summary
  .addHeading('Test Results').write()
  }
} catch (e) {
  console.log(e);
}
}

summary_generator()