import { Client as workflowClient  } from "@upstash/workflow"
import config from "./config";

const workflow = new workflowClient({
    baseUrl : config.env.upstash.qstashUrl,
    token : config.env.upstash.qstashToken
}); 