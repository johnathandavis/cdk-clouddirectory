import * as cdk from '@aws-cdk/core';
import { CfnCloudDirectory } from './CfnCloudDirectory';
import { PublishedSchema } from './PublishedSchema';

export interface CloudDirectoryProps {
  
  publishedSchema: PublishedSchema;
  name: string;

}

export class CloudDirectory extends cdk.Construct {

  //readonly appliedSchemaArn: string;
  readonly directoryArn: string;
  private readonly cfnCloudDirectory : CfnCloudDirectory;

  constructor(parent: cdk.Construct, id: string, props: CloudDirectoryProps) {
    super(parent, id);

    this.cfnCloudDirectory = new CfnCloudDirectory(this, 'CfnCloudDirectory', {
      publishedSchemaArn: props.publishedSchema.publishedSchemaArn,
      name: props.name
    });
    this.directoryArn = cdk.Token.asString(this.cfnCloudDirectory.getAtt('DirectoryArn'));
    }
}