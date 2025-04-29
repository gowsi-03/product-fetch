import contentfulManagement from "contentful-management";
import type { EnvironmentGetter, ContentfulEnvironment } from "contentful-typescript-codegen";
import dotenv from "dotenv";
dotenv.config();
console.log("Access Token:", process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN);
const getContentfulEnvironment: EnvironmentGetter = async () => {
  const client = contentfulManagement.createClient({
    accessToken: 'CFPAT-O0r3rVVFnMVqams83Oo3pe9uL6VMGOYP3-5mkD0n-is',
  });

  const space = await client.getSpace('sihfhbb207j5');
  // Cast the environment to ContentfulEnvironment to satisfy the type
  const environment = await space.getEnvironment('master');
  return environment as unknown as ContentfulEnvironment;
};

export default getContentfulEnvironment;
