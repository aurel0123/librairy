import { Client as WorkflowClient  } from "@upstash/workflow"
import { Client as QStashClient } from "@upstash/qstash";
import config from "./config";

export const workflowClient = new WorkflowClient({
    baseUrl : config.env.upstash.qstashUrl,
    token : config.env.upstash.qstashToken
}); 

const qstashClient = new QStashClient({
    token : config.env.upstash.qstashToken,
});

export const sendEmail = async ({email ,subject, message}: EmailParams) => {

    await qstashClient.publishJSON({
        url: `${config.env.prodApiEndpoint}/api/send-email`, // 🔁 remplace par ton URL réelle
        body: {
        from: "JS Mastery <contact@adrianjsmastery.com>",
        to : email,
        subject,
        html : message,
        },
    });
}