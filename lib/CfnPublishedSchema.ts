import cdk = require('@aws-cdk/core');

/**
 * Determine whether the given properties match those of a `CfnPublishedSchema`
 *
 * @param properties - the TypeScript properties of a `CfnPublishedSchema`
 *
 * @returns the result of the validation.
 */
function cfnPublishedSchemaPropsValidator(properties: any): cdk.ValidationResult {
  if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
  const errors = new cdk.ValidationResults();
  errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
  errors.collect(cdk.propertyValidator('developmentSchemaArn', cdk.requiredValidator)(properties.developmentSchemaArn));
  errors.collect(cdk.propertyValidator('version', cdk.requiredValidator)(properties.version));
  errors.collect(cdk.propertyValidator('minorVersion', cdk.requiredValidator)(properties.minorVersion));
  return errors.wrap('supplied properties not correct for "CfnSchemaProps"');
}

/**
* Renders the AWS CloudFormation properties of an `AWS::EC2::VPC` resource
*
* @param properties - the TypeScript properties of a `CfnSchema`
*
* @returns the AWS CloudFormation properties of an `AWS::EC2::VPC` resource.
*/
// @ts-ignore TS6133
function cfnPublishedSchemaPropsToCloudFormation(properties: any): any {
  if (!cdk.canInspect(properties)) { return properties; }
  cfnPublishedSchemaPropsValidator(properties).assertSuccess();
  return {
    Name: cdk.stringToCloudFormation(properties.name),
    Version: cdk.stringToCloudFormation(properties.version),
    MinorVersion: cdk.stringToCloudFormation(properties.minorVersion),
    DevelopmentSchemaArn: cdk.stringToCloudFormation(properties.developmentSchemaArn),
  };
}

export interface CfnPublishedSchemaProps {
  readonly name: string;
  readonly version: string;
  readonly minorVersion: string;
  readonly developmentSchemaArn : string;
}

export class CfnPublishedSchema extends cdk.CfnResource implements cdk.IInspectable {
  /**
   * The CloudFormation resource type name for this resource class.
   */
  public static readonly CFN_RESOURCE_TYPE_NAME = "Zugzwang::NativeCloudDirectory::PublishedSchema";

  readonly name: string;
  readonly version: string;
  readonly minorVersion: string;
  readonly developmentSchemaArn : string;

  constructor(scope: cdk.Construct, id: string, props: CfnPublishedSchemaProps) {
      super(scope, id, { type: CfnPublishedSchema.CFN_RESOURCE_TYPE_NAME, properties: props });
      this.name = props.name;
      this.version = props.version;
      this.minorVersion = props.minorVersion;
      this.developmentSchemaArn = props.developmentSchemaArn;
      cdk.requireProperty(props, 'name', this);
      cdk.requireProperty(props, 'version', this);
      cdk.requireProperty(props, 'minorVersion', this);
      cdk.requireProperty(props, 'developmentSchemaArn', this);
  }

  /**
   * Examines the CloudFormation resource and discloses attributes.
   *
   * @param inspector - tree inspector to collect and process attributes
   *
   * @stability experimental
   */
  public inspect(inspector: cdk.TreeInspector) {
      inspector.addAttribute("aws:cdk:cloudformation:type", CfnPublishedSchema.CFN_RESOURCE_TYPE_NAME);
      inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
  }

  protected get cfnProperties(): { [key: string]: any }  {
      return {
        name: this.name,
        version: this.version,
        minorVersion: this.minorVersion,
        developmentSchemaArn: this.developmentSchemaArn
      };
  }
  protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
      return cfnPublishedSchemaPropsToCloudFormation(props);
  }
}