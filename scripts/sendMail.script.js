#! /usr/bin/env node

const axios = require("axios").default;
const inquirer = require("inquirer");
const { createSpinner } = require("nanospinner");

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
inquirer
  .prompt([
    {
      type: "input",
      name: "from",
      message: "please enter sender email address (from) ?",
    },
    {
      type: "input",
      name: "to",
      message: "please enter receiver email address (to) ?",
    },
    {
      type: "input",
      name: "subject",
      message: "please enter subject of email that you want (subject) ?",
    },
    {
      type: "input",
      name: "text",
      message: "please enter text of email that you want (text) ?",
    },
    {
      type: "input",
      name: "html",
      message: "please enter html of email that you want (html) ? ",
    },
  ])
  .then(async (answers) => {
    const spinner = createSpinner("sending email...").start();
    try {
      await sleep();
      await sendAPiCall(answers);
      spinner.success();
    } catch (error) {
        if(error?.response?.status === 422) {
            spinner.error({text: error.response.data.message});
        }
   
    }
  });

const sendAPiCall = async (data) => {
  return axios.post(`http://localhost:4444/api/mail`, data);
};
