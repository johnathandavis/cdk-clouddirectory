import cdk = require('@aws-cdk/core');

/**
 * Determine whether the given properties match those of a `CfnDevelopmentSchema`
 *
 * @param properties - the TypeScript properties of a `CfnDevelopmentSchema`
 *
 * @returns the result of the validation.
 */
function cfnDevelopmentSchemaPropsValidator(properties: any): cdk.ValidationResult {
  if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
  const errors = new cdk.ValidationResults();
  errors.collect(cdk.propertyValidator('schemaName', cdk.requiredValidator)(properties.schemaName));
  errors.collect(cdk.propertyValidator('schemaBucketName', cdk.requiredValidator)(properties.schemaBucketName));
  errors.collect(cdk.propertyValidator('schemaKey', cdk.requiredValidator)(properties.schemaKey));
  return errors.wrap('supplied properties not correct for "CfnDevelopmentSchemaProps"');
}

/**
* Renders the AWS CloudFormation properties of an `AWS::EC2::VPC` resource
*
* @param properties - the TypeScript properties of a `CfnDevelopmentSchema`
*
* @returns the AWS CloudFormation properties of an `AWS::EC2::VPC` resource.
*/
// @ts-ignore TS6133
function cfnDevelopmentSchemaPropsToCloudFormation(properties: any): any {
  if (!cdk.canInspect(properties)) { return properties; }
  cfnDevelopmentSchemaPropsValidator(properties).assertSuccess();
  return {
    SchemaName: cdk.stringToCloudFormation(properties.schemaName),
    SchemaBucketName: cdk.stringToCloudFormation(properties.schemaBucketName),
    SchemaKey: cdk.stringToCloudFormation(properties.schemaKey),
  };
}

export interface CfnDevelopmentSchemaProps {
  readonly schemaName: string;
  readonly schemaBucketName: string;
  readonly schemaKey: string;
}

export class CfnDevelopmentSchema extends cdk.CfnResource implements cdk.IInspectable {
  /**
   * The CloudFormation resource type name for this resource class.
   */
  public static readonly CFN_RESOURCE_TYPE_NAME = "Zugzwang::NativeCloudDirectory::DevelopmentSchema";

  public readonly schemaName: string;
  public readonly schemaBucketName: string;
  public readonly schemaKey: string;

  constructor(scope: cdk.Construct, id: string, props: CfnDevelopmentSchemaProps) {
      super(scope, id, { type: CfnDevelopmentSchema.CFN_RESOURCE_TYPE_NAME, properties: props });
      this.schemaName = props.schemaName;
      this.schemaBucketName = props.schemaBucketName;
      this.schemaKey = props.schemaKey;
      cdk.requireProperty(props, 'schemaName', this);
      cdk.requireProperty(props, 'schemaBucketName', this);
      cdk.requireProperty(props, 'schemaKey', this);
  }

  /**
   * Examines the CloudFormation resource and discloses attributes.
   *
   * @param inspector - tree inspector to collect and process attributes
   *
   * @stability experimental
   */
  public inspect(inspector: cdk.TreeInspector) {
      inspector.addAttribute("aws:cdk:cloudformation:type", CfnDevelopmentSchema.CFN_RESOURCE_TYPE_NAME);
      inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
  }

  protected get cfnProperties(): { [key: string]: any }  {
      return {
        schemaName: this.schemaName,
        schemaBucketName: this.schemaBucketName,
        schemaKey: this.schemaKey
      };
  }
  protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
      return cfnDevelopmentSchemaPropsToCloudFormation(props);
  }
}