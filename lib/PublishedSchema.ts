import * as cdk from '@aws-cdk/core';
import { CfnPublishedSchema } from './CfnPublishedSchema';
import { DevelopmentSchema } from './DevelopmentSchema';

export interface PublishedSchemaProps {
  
  developmentSchema: DevelopmentSchema;
  name: string;
  version: string;
  minorVersion: string;
}

export class PublishedSchema extends cdk.Construct {

  public readonly publishedSchemaArn: string;
  private readonly cfnSchema : CfnPublishedSchema;

  constructor(parent: cdk.Construct, id: string, props: PublishedSchemaProps) {
    super(parent, id);

    this.cfnSchema = new CfnPublishedSchema(this, 'CfnPublishedSchema', {
      name: props.name,
      version: props.version,
      minorVersion: props.minorVersion,
      developmentSchemaArn: props.developmentSchema.developmentSchemaArn
    });
    this.publishedSchemaArn = cdk.Token.asString(this.cfnSchema.getAtt('PublishedSchemaArn'));
  }
}