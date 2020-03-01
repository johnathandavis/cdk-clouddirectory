import cdk = require('@aws-cdk/core');

/**
 * Determine whether the given properties match those of a `CfnCloudDirectory`
 *
 * @param properties - the TypeScript properties of a `CfnCloudDirectory`
 *
 * @returns the result of the validation.
 */
function cfnCloudDirectoryPropsValidator(properties: any): cdk.ValidationResult {
  if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
  const errors = new cdk.ValidationResults();
  errors.collect(cdk.propertyValidator('publishedSchemaArn', cdk.requiredValidator)(properties.publishedSchemaArn));
  errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
  return errors.wrap('supplied properties not correct for "CfnCloudDirectoryProps"');
}

/**
* Renders the AWS CloudFormation properties of an `AWS::EC2::VPC` resource
*
* @param properties - the TypeScript properties of a `CfnSchema`
*
* @returns the AWS CloudFormation properties of an `AWS::EC2::VPC` resource.
*/
// @ts-ignore TS6133
function cfnCloudDirectoryPropsToCloudFormation(properties: any): any {
  if (!cdk.canInspect(properties)) { return properties; }
  cfnCloudDirectoryPropsValidator(properties).assertSuccess();
  return {
    PublishedSchemaArn: cdk.stringToCloudFormation(properties.publishedSchemaArn),
    Name: cdk.stringToCloudFormation(properties.name)
  };
}

export interface CfnCloudDirectoryProps {
  readonly publishedSchemaArn: string;
  readonly name: string;
}

export class CfnCloudDirectory extends cdk.CfnResource implements cdk.IInspectable {
  /**
   * The CloudFormation resource type name for this resource class.
   */
  public static readonly CFN_RESOURCE_TYPE_NAME = "Zugzwang::NativeCloudDirectory::CloudDirectory";

  readonly name: string;
  readonly publishedSchemaArn: string;

  constructor(scope: cdk.Construct, id: string, props: CfnCloudDirectoryProps) {
      super(scope, id, { type: CfnCloudDirectory.CFN_RESOURCE_TYPE_NAME, properties: props });
      this.name = props.name;
      this.publishedSchemaArn = props.publishedSchemaArn;
      cdk.requireProperty(props, 'name', this);
      cdk.requireProperty(props, 'publishedSchemaArn', this);
  }

  /**
   * Examines the CloudFormation resource and discloses attributes.
   *
   * @param inspector - tree inspector to collect and process attributes
   *
   * @stability experimental
   */
  public inspect(inspector: cdk.TreeInspector) {
      inspector.addAttribute("aws:cdk:cloudformation:type", CfnCloudDirectory.CFN_RESOURCE_TYPE_NAME);
      inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
  }

  protected get cfnProperties(): { [key: string]: any }  {
      return {
        name: this.name,
        publishedSchemaArn: this.publishedSchemaArn
      };
  }
  protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
      return cfnCloudDirectoryPropsToCloudFormation(props);
  }
}