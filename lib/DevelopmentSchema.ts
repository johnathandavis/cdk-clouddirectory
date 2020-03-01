import * as cdk from '@aws-cdk/core';
import { Asset } from '@aws-cdk/aws-s3-assets';
import { CfnDevelopmentSchema } from './CfnDevelopmentSchema';

export interface DevelopmentSchemaProps {
  schemaName: string;
  schema: Asset;
}

export class DevelopmentSchema extends cdk.Construct {

  public readonly developmentSchemaArn: string;
  private readonly cfnDevelopmentSchema : CfnDevelopmentSchema;

  constructor(parent: cdk.Construct, id: string, props: DevelopmentSchemaProps) {
    super(parent, id);

    this.cfnDevelopmentSchema = new CfnDevelopmentSchema(this, 'CfnDevelopmentSchema', {
      schemaName: props.schemaName,
      schemaBucketName: props.schema.s3BucketName,
      schemaKey: props.schema.s3ObjectKey
    });
    this.developmentSchemaArn = cdk.Token.asString(this.cfnDevelopmentSchema.getAtt('DevelopmentSchemaArn'));
  }
}