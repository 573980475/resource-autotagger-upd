const { S3Client, DeleteObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client();

exports.handler = async (event) => {
  console.log(event);
  console.log(process.env.bucketName);
  var bucketName = process.env.bucketName;
  if (event['RequestType'] == 'Create') {
    const command = new PutObjectCommand({
      Key: "mapping.json",
      Bucket: process.env.bucketName,
      Body: 
      `{
          "Mapping": [
              {
                  "CTEventName": "CreateBackupPlan",
                  "CTEventSource": "backup.amazonaws.com",
                  "REResourceType": "backup:backupplan",
                  "Global": false
              },
              {
                  "CTEventName": "CreateDistribution",
                  "CTEventSource": "cloudfront.amazonaws.com",
                  "REResourceType": "cloudfront:distribution",
                  "Global": true
              },
              {
                  "CTEventName": "CreateReplicationInstance",
                  "CTEventSource": "dms.amazonaws.com",
                  "REResourceType": "dms:replicationinstance",
                  "Global": false
              },
              {
                  "CTEventName": "CreateReplicationTask",
                  "CTEventSource": "dms.amazonaws.com",
                  "REResourceType": "dms:replicationtask",
                  "Global": false
              },
              {
                  "CTEventName": "CreateTable",
                  "CTEventSource": "dynamodb.amazonaws.com",
                  "REResourceType": "dynamodb:table",
                  "Global": false
              },
              {
                  "CTEventName": "CreateVolume",
                  "CTEventSource": "ec2.amazonaws.com",
                  "REResourceType": "ec2:volume",
                  "Global": false
              },
              {
                  "CTEventName": "RunInstances",
                  "CTEventSource": "ec2.amazonaws.com",
                  "REResourceType": "ec2:instance",
                  "Global": false
              },
              {
                  "CTEventName": "CreateNatGateway",
                  "CTEventSource": "ec2.amazonaws.com",
                  "REResourceType": "ec2:natgateway",
                  "Global": false
              },
              {
                  "CTEventName": "CreateImage",
                  "CTEventSource": "ec2.amazonaws.com",
                  "REResourceType": "ec2:image",
                  "Global": false
              },
              {
                  "CTEventName": "AllocateAddress",
                  "CTEventSource": "ec2.amazonaws.com",
                  "REResourceType": "ec2:elastic-ip",
                  "Global": false
              },
              {
                  "CTEventName": "CreateTransitGateway",
                  "CTEventSource": "ec2.amazonaws.com",
                  "REResourceType": "ec2:transit-gateway",
                  "Global": false
              },
              {
                  "CTEventName": "CreateVpcEndpoint",
                  "CTEventSource": "ec2.amazonaws.com",
                  "REResourceType": "ec2:vpc-endpoint",
                  "Global": false
              },
              {
                  "CTEventName": "CreateCluster",
                  "CTEventSource": "ecs.amazonaws.com",
                  "REResourceType": "ecs:cluster",
                  "Global": false
              },
              {
                  "CTEventName": "CreateCluster",
                  "CTEventSource": "eks.amazonaws.com",
                  "REResourceType": "eks:cluster",
                  "Global": false
              },
              {
                  "CTEventName": "CreateCacheCluster",
                  "CTEventSource": "elasticache.amazonaws.com",
                  "REResourceType": "elasticache:cluster",
                  "Global": false
              },
              {
                  "CTEventName": "CreateSnapshot",
                  "CTEventSource": "elasticache.amazonaws.com",
                  "REResourceType": "elasticache:snapshot",
                  "Global": false
              },
              {
                  "CTEventName": "CreateFileSystem",
                  "CTEventSource": "elasticfilesystem.amazonaws.com",
                  "REResourceType": "efs:filesystem",
                  "Global": false
              },
              {
                  "CTEventName": "CreateLoadBalancer",
                  "CTEventSource": "elasticloadbalancing.amazonaws.com",
                  "REResourceType": "elasticloadbalancing:loadbalancer",
                  "Global": false
              },
              {
                  "CTEventName": "CreateLoadBalancer",
                  "CTEventSource": "elasticloadbalancing.amazonaws.com",
                  "REResourceType": "elasticloadbalancing:loadbalancer/app",
                  "Global": false
              },
              {
                  "CTEventName": "CreateLoadBalancer",
                  "CTEventSource": "elasticloadbalancing.amazonaws.com",
                  "REResourceType": "elasticloadbalancing:loadbalancer/net",
                  "Global": false
              },
              {
                  "CTEventName": "CreateDomain",
                  "CTEventSource": "es.amazonaws.com",
                  "REResourceType": "es:domain",
                  "Global": false
              },
              {
                  "CTEventName": "CreateDomain",
                  "CTEventSource": "es.amazonaws.com",
                  "REResourceType": "opensearch:domain",
                  "Global": false
              },
              {
                  "CTEventName": "CreateDeliveryStream",
                  "CTEventSource": "firehose.amazonaws.com",
                  "REResourceType": "kinesisfirehose:deliverystream",
                  "Global": false
              },
              {
                  "CTEventName": "CreateCrawler",
                  "CTEventSource": "glue.amazonaws.com",
                  "REResourceType": "glue:crawler",
                  "Global": false
              },
              {
                  "CTEventName": "CreateDatabase",
                  "CTEventSource": "glue.amazonaws.com",
                  "REResourceType": "glue:database",
                  "Global": false
              },
              {
                  "CTEventName": "CreateJob",
                  "CTEventSource": "glue.amazonaws.com",
                  "REResourceType": "glue:job",
                  "Global": false
              },
              {
                  "CTEventName": "CreateCluster",
                  "CTEventSource": "kafka.amazonaws.com",
                  "REResourceType": "kafka:cluster",
                  "Global": false
              },
              {
                  "CTEventName": "CreateStream",
                  "CTEventSource": "kinesis.amazonaws.com",
                  "REResourceType": "kinesis:stream",
                  "Global": false
              },
              {
                  "CTEventName": "CreateKey",
                  "CTEventSource": "kms.amazonaws.com",
                  "REResourceType": "kms:key",
                  "Global": false
              },
              {
                  "CTEventName": "CreateFunction",
                  "CTEventSource": "lambda.amazonaws.com",
                  "REResourceType": "lambda:function",
                  "Global": false
              },
              {
                  "CTEventName": "CreateLogStream",
                  "CTEventSource": "logs.amazonaws.com",
                  "REResourceType": "cloudwatch:logs",
                  "Global": false
              },
              {
                  "CTEventName": "CreateLogGroup",
                  "CTEventSource": "logs.amazonaws.com",
                  "REResourceType": "cloudwatch:logs",
                  "Global": false
              },
              {
                  "CTEventName": "PutDashboard",
                  "CTEventSource": "monitoring.amazonaws.com",
                  "REResourceType": "cloudwatch:dashboard",
                  "Global": false
              },
              {
                  "CTEventName": "PutMetricAlarm",
                  "CTEventSource": "monitoring.amazonaws.com",
                  "REResourceType": "cloudwatch:alarm",
                  "Global": false
              },
              {
                  "CTEventName": "CreateDBCluster",
                  "CTEventSource": "rds.amazonaws.com",
                  "REResourceType": "rds:cluster",
                  "Global": false
              },
              {
                  "CTEventName": "CreateDBInstance",
                  "CTEventSource": "rds.amazonaws.com",
                  "REResourceType": "rds:db",
                  "Global": false
              },
              {
                  "CTEventName": "CreateDBClusterSnapshot",
                  "CTEventSource": "rds.amazonaws.com",
                  "REResourceType": "rds:snapshot",
                  "Global": false
              },
              {
                  "CTEventName": "CreateCluster",
                  "CTEventSource": "redshift.amazonaws.com",
                  "REResourceType": "redshift:cluster",
                  "Global": false
              },
              {
                  "CTEventName": "CreateHostedZone",
                  "CTEventSource": "route53.amazonaws.com",
                  "REResourceType": "route53:hostedzone",
                  "Global": true
              },
              {
                  "CTEventName": "CreateBucket",
                  "CTEventSource": "s3.amazonaws.com",
                  "REResourceType": "s3:bucket",
                  "Global": true
              },
              {
                  "CTEventName": "CreateNotebookInstance",
                  "CTEventSource": "sagemaker.amazonaws.com",
                  "REResourceType": "sagemaker:notebookinstance",
                  "Global": false
              },
              {
                  "CTEventName": "CreateSecret",
                  "CTEventSource": "secretsmanager.amazonaws.com",
                  "REResourceType": "secretsmanager:secret",
                  "Global": false
              },
              {
                  "CTEventName": "CreateTopic",
                  "CTEventSource": "sns.amazonaws.com",
                  "REResourceType": "sns:topic",
                  "Global": false
              },
              {
                  "CTEventName": "CreateQueue",
                  "CTEventSource": "sqs.amazonaws.com",
                  "REResourceType": "sqs:queue",
                  "Global": false
              }
          ]
      }`
    });
    const response = await s3Client.send(command);
  } 
  const response = {
    statusCode: 200,
    body: JSON.stringify('S3 Loader done'),
  };
  return response;
};