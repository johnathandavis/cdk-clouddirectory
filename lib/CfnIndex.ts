import cdk = require('@aws-cdk/core');

/**
 * Determine whether the given properties match those of a `CfnIndex`
 *
 * @param properties - the TypeScript properties of a `CfnIndex`
 *
 * @returns the result of the validation.
 */
function cfnIndexPropsValidator(properties: any): cdk.ValidationResult {
  if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
  const errors = new cdk.ValidationResults();
  errors.collect(cdk.propertyValidator('directoryArn', cdk.requiredValidator)(properties.directoryArn));
  errors.collect(cdk.propertyValidator('isUnique', cdk.requiredValidator)(properties.isUnique));
  errors.collect(cdk.propertyValidator('orderedIndexedAttributes', cdk.requiredValidator)(properties.orderedIndexedAttributes));
  return errors.wrap('supplied properties not correct for "CfnIndexProps"');
}

/**
* Renders the AWS CloudFormation properties of an `AWS::EC2::VPC` resource
*
* @param properties - the TypeScript properties of a `CfnDevelopmentSchema`
*
* @returns the AWS CloudFormation properties of an `AWS::EC2::VPC` resource.
*/
// @ts-ignore TS6133
function cfnIndexPropsToCloudFormation(properties: any): any {
  if (!cdk.canInspect(properties)) { return properties; }
  cfnIndexPropsValidator(properties).assertSuccess();
  var linkNameObj = {};
  if (properties.linkName !== undefined) {
    linkNameObj = {
      LinkName: cdk.stringToCloudFormation(properties.linkName)
    }
  }
  var parentRefObj = {};
  if (properties.parentReference !== undefined) {
    parentRefObj = {
      ParentReference: cdk.stringToCloudFormation(properties.parentReference)
    }
  }

  var cfnAttributes = [];
  for (var i = 0; i < properties.orderedIndexedAttributes.length; i++) {
    const att = properties.orderedIndexedAttributes[i] as CfnIndexAttribute;
    cfnAttributes.push({
      FacetName: cdk.stringToCloudFormation(att.facetName),
      SchemaArn: cdk.stringToCloudFormation(att.schemaArn),
      Name: cdk.stringToCloudFormation(att.name),
    });
  }

  return {
    DirectoryArn: cdk.stringToCloudFormation(properties.directoryArn),
    IsUnique: cdk.stringToCloudFormation(properties.schemaName),
    ...linkNameObj,
    ...parentRefObj,
    OrderedIndexedAttributes: cfnAttributes,
    SchemaKey: cdk.stringToCloudFormation(properties.schemaKey),
  };
}

export interface CfnIndexProps {
  readonly directoryArn: string;
  readonly isUnique: boolean;
  readonly linkName?: string;
  readonly parentReference?: string;
  readonly orderedIndexedAttributes: CfnIndexAttribute[];
}

export interface CfnIndexAttribute {
  facetName: string,
  name: string,
  schemaArn: string
}

export class CfnIndex extends cdk.CfnResource implements cdk.IInspectable {
  /**
   * The CloudFormation resource type name for this resource class.
   */
  public static readonly CFN_RESOURCE_TYPE_NAME = "Zugzwang::NativeCloudDirectory::Index";

  readonly directoryArn: string;
  readonly isUnique: boolean;
  readonly linkName?: string;
  readonly parentReference?: string;
  readonly orderedIndexedAttributes: CfnIndexAttribute[];

  constructor(scope: cdk.Construct, id: string, props: CfnIndexProps) {
      super(scope, id, { type: CfnIndex.CFN_RESOURCE_TYPE_NAME, properties: props });
      this.directoryArn = props.directoryArn;
      this.isUnique = props.isUnique;
      this.linkName = props.linkName;
      this.parentReference = props.parentReference;
      this.orderedIndexedAttributes = props.orderedIndexedAttributes;
      cdk.requireProperty(props, 'directoryArn', this);
      cdk.requireProperty(props, 'isUnique', this);
      cdk.requireProperty(props, 'orderedIndexedAttributes', this);
  }

  /**
   * Examines the CloudFormation resource and discloses attributes.
   *
   * @param inspector - tree inspector to collect and process attributes
   *
   * @stability experimental
   */
  public inspect(inspector: cdk.TreeInspector) {
      inspector.addAttribute("aws:cdk:cloudformation:type", CfnIndex.CFN_RESOURCE_TYPE_NAME);
      inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
  }

  protected get cfnProperties(): { [key: string]: any }  {
      return {
        directoryArn: this.directoryArn,
        linkName: this.linkName,
        parentReference: this.parentReference,
        isUnique: this.isUnique,
        orderedIndexedAttributes: this.orderedIndexedAttributes
      };
  }
  protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
      return cfnIndexPropsToCloudFormation(props);
  }
}