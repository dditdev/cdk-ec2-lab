import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class MyFirstCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Existing VPC
    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', {
      vpcId: 'vpc-09e3318a260b7cedb',
    });

    // Existing Security Group
    const sg = ec2.SecurityGroup.fromLookupByName(
      this,
      'DevSG',
      'dev-sg',
      vpc
    );

    // Ubuntu AMI
    const ami = ec2.MachineImage.lookup({
      name: 'ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*',
      owners: ['099720109477'],
    });

    // EC2 Instance
    const instance = new ec2.Instance(this, 'UbuntuInstance', {
      vpc,
      instanceType: new ec2.InstanceType('t3.micro'),
      machineImage: ami,
      securityGroup: sg,
      keyName: 'linux_kp',

      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
    });

    // Ensure public IP
    const cfnInstance = instance.node.defaultChild as ec2.CfnInstance;
    cfnInstance.addPropertyOverride('NetworkInterfaces', [
      {
        AssociatePublicIpAddress: true,
        DeviceIndex: '0',
      },
    ]);

    // Outputs
    new cdk.CfnOutput(this, 'InstanceId', {
      value: instance.instanceId,
    });

    new cdk.CfnOutput(this, 'PublicIP', {
      value: instance.instancePublicIp,
    });
  }
}
