import * as cdk from '@aws-cdk/core';
import { CfnIndex, CfnIndexAttribute } from './CfnIndex';
import { CloudDirectory } from './CloudDirectory';

export interface DirectoryIndexAttribute {
  facetName: string,
  schemaArn: string,
  name: string 
}

export interface DirectoryIndexProps {
  
  isUnique: boolean,
  directory: CloudDirectory,
  orderedIndexAttributes: DirectoryIndexAttribute[]
  linkName?: string,
  parentReference?: string
}

export class DirectoryIndex extends cdk.Construct {

  readonly indexObjectIdentitifer: string;
  private readonly cfnIndex : CfnIndex;

  constructor(parent: cdk.Construct, id: string, props: DirectoryIndexProps) {
    super(parent, id);

    const cfnAttributes : CfnIndexAttribute[] = [];
    props.orderedIndexAttributes.forEach(att => {
      cfnAttributes.push({
        facetName: att.facetName,
        schemaArn: att.schemaArn,
        name: att.name
      });
    })
    this.cfnIndex = new CfnIndex(this, 'Index', {
      directoryArn: props.directory.directoryArn,
      orderedIndexedAttributes: cfnAttributes,
      isUnique: props.isUnique,
      linkName: props.linkName,
      parentReference: props.parentReference
    });
    this.indexObjectIdentitifer = cdk.Token.asString(this.cfnIndex.getAtt('IndexObjectIdentifier'));
  }
}