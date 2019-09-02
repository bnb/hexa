import inquirer, { Answers, QuestionCollection } from "inquirer";
import { getCurrentDirectoryBase } from "./utils";
const uuid = require("uuid");

export function chooseSubscription(subscriptionsList: AzureSubscription[]): Promise<Answers> {
  const questions: QuestionCollection = [
    {
      type: "list",
      name: "subscription",
      message: "Choose a subscription:",
      choices: subscriptionsList.map((subscription: AzureSubscription) => {
        return {
          name: `${subscription.name}`,
          disabled: subscription.state !== "Enabled",
          value: subscription.id
        };
      }),
      validate: function(value: string) {
        if (value.length) {
          return true;
        } else {
          return "Please choose a subscription.";
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}

export function chooseResourceGroup(resourceGroups: AzureResourceGroup[]): Promise<Answers> {
  if (process.env.NITRO_ENABLE_ADDING_NEW_RESOURCE) {
    resourceGroups = [{
      id: "",
      location: "",
      tags: {},
      name: "<Create a new resource group>"
    }, ...resourceGroups];
  }
  const questions: QuestionCollection = [
    {
      type: "list",
      name: "resourceGroup",
      message: "Choose resource group:",
      choices: resourceGroups.map((resourceGroup: AzureResourceGroup) => {
        return {
          name: `${resourceGroup.name}`,
          value: resourceGroup.id
        };
      }),
      validate: function(value: string) {
        if (value.length) {
          return true;
        } else {
          return "Please enter a resource group.";
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}

export function chooseAccountStorage(storageAccounts: AzureStorage[]): Promise<inquirer.Answers> {
  if (process.env.NITRO_ENABLE_ADDING_NEW_RESOURCE) {
    storageAccounts = [{
      id: "",
      name: "<Create a new storage account>"
    }, ...storageAccounts];
  }
  const questions: QuestionCollection = [
    {
      type: "list",
      name: "storage",
      message: "Choose a storage account:",
      choices: storageAccounts.map((storageAccount: AzureStorage) => {
        return {
          name: storageAccount.name,
          value: storageAccount.id
        };
      }),
      validate: function(value: string) {
        if (value.length) {
          return true;
        } else {
          return "Please enter a storage account.";
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}
export function askForFeatures(): Promise<Answers> {
  const questions: QuestionCollection = [
    {
      type: "checkbox",
      name: "features",
      message: "Choose features you want to setup:",
      choices: [
        {
          name: "Storage: Configure and deploy to Azure Blob Storage",
          value: "storage",
          checked: true
        },
        {
          name: "Hosting: Configure and deploy to Azure Static Website",
          value: "hosting"
        },
        {
          name: "Functions: Configure and deploy an Azure Functions",
          value: "functions",
          disabled: "coming soon"
        },
        {
          name: "Database: Configure and deploy to Azure Table Storage",
          value: "database",
          disabled: "coming soon"
        },
        {
          name: "Auth: Enable and setup Azure AD Authentication",
          value: "auth",
          disabled: "coming soon"
        }
      ],
      validate: function(value: string) {
        if (value.length) {
          return true;
        } else {
          return "Please choose at least one feature.";
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}

export function askForResourceGroupDetails(regions: AzureRegion[]): Promise<Answers> {
  const questions: QuestionCollection = [
    {
      type: "input",
      name: "name",
      message: "Enter a name for the resource group:",
      default: `nitro-group-${uuid()}`,
      validate: function(value: string) {
        if (value.length) {
          return true;
        } else {
          return "Please enter a name for the resource group.";
        }
      }
    },
    {
      type: "list",
      name: "region",
      message: "Choose a region:",
      choices: regions.map((region: AzureRegion) => {
        return {
          name: `${region.name} (${region.displayName})`,
          value: region.name,
          short: region.displayName
        };
      }),
      validate: function(value: string) {
        if (value.length) {
          return true;
        } else {
          return "Please choose a region.";
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}
export function askForStorageAccountDetails(regions: AzureRegion[]): Promise<Answers> {
  const questions: QuestionCollection = [
    {
      type: "input",
      name: "name",
      message: "Enter a name for the storage account:",
      default: `nitrostorage${uuid().split("-").pop()}`,
      validate: function(value: string) {
        if (value.length) {
          return true;
        } else {
          return "Please enter a name for the storage account.";
        }
      }
    }
    /**

     {
       type: "list",
       name: "region",
       message: "Choose a region:",
       default: Config.get("region") || null,
       choices: regions.map((region: AzureRegion) => {
         return {
           name: `${region.name} (${region.displayName})`,
           value: region.name,
           short: region.displayName
          };
        }),
        validate: function(value: string) {
          if (value.length) {
            return true;
          } else {
            return "Please choose a region.";
          }
        }
      }
      */
  ];
  return inquirer.prompt(questions);
}
export function askForProjectDetails(): Promise<Answers> {
  const questions: QuestionCollection = [
    {
      type: "input",
      name: "name",
      message: "Enter a name for the project:",
      default: getCurrentDirectoryBase(),
      validate: function(value: string) {
        if (value.length) {
          return true;
        } else {
          return "Please enter a name for the project.";
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}

export function askIfOverrideProjectFile(): Promise<Answers> {
  const questions: QuestionCollection = [
    {
      type: "confirm",
      name: "override",
      message: "Configuration file found. Do you want to override it?",
      default: false
    }
  ];

  return inquirer.prompt(questions);
}