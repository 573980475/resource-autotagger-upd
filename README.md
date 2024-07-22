### 解决方案介绍

此解决方案利用两项核心服务 — AWS Resource Explorer 和 AWS CloudTrail。它包括在 Amazon CloudWatch Events 中创建的规则，用于安排标记过程。AWS Lambda 函数和 Amazon DynamoDB 表有助于将未标记的资源映射到其相应的 CloudTrail 创建事件。

![image](https://github.com/user-attachments/assets/47311799-3e53-44ad-8800-83b706b2f1f8)

1. EventBridge 计划程序规则设置为每 30 分钟运行一次，以检测创建的任何新资源。
2. 计划程序规则将触发 Lambda 函数。
3. Lambda 函数将扫描存储在 S3 存储桶中的映射文件，以检索包含资源类型列表及其映射的 CloudTrail 创建事件名称和事件源的记录。在本演示中，资源类型列表涵盖 EC2、S3 存储桶、Lambda 和 ECS。
4. 对于映射文件中的每种资源类型，Lambda 函数将查询 Resource Explorer 中是否有任何未正确标记的该类型的资源。
5. 对于从 Resource Explorer 返回的每个资源项标识符，Lambda 函数将使用步骤 4 中的映射文件使用资源标识符、CloudTrail 事件源和 CloudTrail 事件名称查询 CloudTrail 事件，以查找创建资源的委托人信息。
6. 然后，Lambda 函数将根据从 CloudTrail 事件中的资源创建的委托人信息生成标签列表，并调用资源组标记 API 以使用生成的标签列表自动标记资源。

### 覆盖范围

目前解决方案已涵盖以下服务，可以参考附件，修改覆盖范围：

1. AWS Backup
2. Amazon CloudFront
3. AWS Database Migration Service (DMS)
4. Amazon DynamoDB
5. Amazon EC2
6. Amazon ECS (Elastic Container Service)
7. Amazon EKS (Elastic Kubernetes Service)
8. Amazon ElastiCache
9. Amazon Elastic File System (EFS)
10. Elastic Load Balancing
11. Amazon Elasticsearch Service / Amazon OpenSearch Service
12. Amazon Kinesis Data Firehose
13. AWS Glue
14. Amazon Managed Streaming for Apache Kafka (MSK)
15. Amazon Kinesis
16. AWS Key Management Service (KMS)
17. AWS Lambda
18. Amazon CloudWatch (包括 CloudWatch Logs)
19. Amazon RDS (Relational Database Service)
20. Amazon Redshift
21. Amazon Route 53
22. Amazon S3 (Simple Storage Service)
23. Amazon SageMaker
24. AWS Secrets Manager
25. Amazon SNS (Simple Notification Service)
26. Amazon SQS (Simple Queue Service)

### 注意事项

1. AWS Resource Explorer 每月最多可执行 10,000 次搜索操作，并且每个查询最多可返回 1000 个结果。这样每个账户每月最多可以标记 10,000,000 个 AWS 资源。
2. 每个 AWS 资源最多可以有 50 个标签。如果某个服务达到了 50 个标签，则自动标签会失败。
3. 此解决方案目前仅限于一个 AWS 账户，无法跨多个账户进行标记。

### 前提条件 —— 启用 Resource Explorer 索引

1. 进入 Resource Explorer，进入设置，为需要打标签的区域创建索引
    
    ![image](https://github.com/user-attachments/assets/bb35bef6-978c-4d48-8630-31b0d24be1e1)
    
2. 选择所需的区域，并创建
    
    ![image](https://github.com/user-attachments/assets/d31c530d-56aa-4ed1-bb72-bffd2da95adf)
    
3. 为已选的区域创建视图，每个区域都需要创建一个视图
    
    ![image](https://github.com/user-attachments/assets/11507b58-3ef8-4279-a473-568afa64c57d)
    
    ![image](https://github.com/user-attachments/assets/90e489a8-e9ae-4145-b3ae-1bbc56f31618)
    

### 前提条件 —— 启用 CloudTrail 并创建跟踪

1. 进入 CloudTrail→跟踪，创建一个跟踪
    
    ![image](https://github.com/user-attachments/assets/98c38238-3917-4419-b225-4bda909c28a0)
    
2. 自定义一个跟踪名称和 KMS 密钥名称，建议选择新建 S3 来存储 Trail 日志
    
    ![image](https://github.com/user-attachments/assets/660d7630-c5af-48e8-8d59-e187a7d125e4)
    
3. 只需要开启管理事件，及其的写入、读取记录
    
    ![image](https://github.com/user-attachments/assets/bb410213-bbf0-4564-b140-c4f1b084a4a1)    

### 解决方案部署

1. 建议使用 AWS CloudShell 作为 CDK 执行环境
    
    ![image](https://github.com/user-attachments/assets/5209b3b1-4832-404b-b23a-c83d3b1daa8a)
    
2. 跟随以下流程，准备 CDK 环境，通过 CDK 部署解决方案
    - 切换到 root 用户（以在 CloudShell 中获得足够的磁盘空间）
        
        `sudo -i`
        
    - 安装 AWS CDK
        
        `npm install -g aws-cdk`
        
    - 将应用程序克隆到本地计算机
        
        `git clone https://github.com/573980475/resource-autotagger-hk.git`
        
    - 切换到项目目录
        
        `cd resource-autotagger-hk`
        
3. 跟随以下流程，通过 CDK 部署解决方案
    - 安装 AWS 云开发工具包 （AWS CDK） 和 Lambda 函数的节点依赖项。
        
        `npm install`
        
    - **如果从未在您的 AWS 账户中设置过 AWS CDK**，请执行以下步骤以引导它。
        
        `cdk bootstrap`
        
    - 使用 AWS CDK 部署解决方案资源。
        
        `cdk deploy`
        
    
    ![image](https://github.com/user-attachments/assets/3d30e667-bc4d-45e1-bd7a-e1c18041e9c2)
    
4. 至此完成了解决方案的部署。如需在部署后自定义标签键值，或标签范围，请参考附件。

### 清理解决方案

- 从克隆存储库的根目录运行以下命令来删除 AWD CDK 堆栈：
    
    `cdk destroy`
    

<aside>
💡 对于 CloudShell 等临时环境，如果克隆的存储库已不存在，则按照以下步骤执行

</aside>

- 切换到 root 用户（以在 CloudShell 中获得足够的磁盘空间）
    
    `sudo -i`
    
- 安装 AWS CDK
    
    `npm install -g aws-cdk`
    
- 将应用程序克隆到本地计算机。
    
    `git clone https://github.com/aws-samples/resource-autotagger.git`
    
- 切换到项目目录。
    
    `cd resource-autotagger`
    
- 安装 AWS 云开发工具包 （AWS CDK） 和 Lambda 函数的节点依赖项。
    
    `npm install`
    
- 从克隆存储库的根目录运行以下命令来删除 AWD CDK 堆栈：
    
    `cdk destroy`
    

### 参考链接

**Tag your AWS Resources consistently with AWS Resource Explorer and AWS CloudTrail**

https://aws.amazon.com/cn/blogs/mt/tag-your-aws-resources-consistently-with-aws-resource-explorer-and-aws-cloudtrail/

**可以与标签编辑器一起使用的资源类型**

https://docs.aws.amazon.com/zh_cn/ARG/latest/userguide/supported-resources.html

**可以使用资源管理器搜索的资源类型**

https://docs.aws.amazon.com/zh_cn/resource-explorer/latest/userguide/supported-resource-types.html?icmp=docs_re_console_supported-resource-types

**CloudTrail Event Generator**

https://www.intelligentdiscovery.io/tools/cloudtrailevents

### 附件 1：部署后如何修改自动标签键值

1. 在 Lambda 中找到开头为 ResourceAutoTagCdkStack-resourceautotag 的函数
    
    ![image](https://github.com/user-attachments/assets/b9d8256d-4efc-4627-91c3-5480af7b6574)
    
2. 在 Lambda 代码中找到以下代码段，并将引号内的内容改为要自定义的标签键、标签值
    
    ```python
    const TAG_KEY = '';
    const TAG_VALUE = '';
    ```
    
    ![image](https://github.com/user-attachments/assets/0a4dd6c1-6f36-47a2-aa7b-ac2658bf4de1)
    

### 附件 2：部署后如何自定义自动标签范围

<aside>
💡 解决方案默认只提供四种服务的自动标签，分别为：EC2创建实例、S3创建桶、Lambda创建函数、ECS创建集群

</aside>

<aside>
‼️ 此处以新建 RDS 时自动打标签举例

</aside>

1. 确认 CloudTrail 中的事件源
    
    ![image](https://github.com/user-attachments/assets/e08c9685-2be4-48b3-a9de-651c71db536c)
    
2. 确认 CloudTrail 中的事件名称（提供多种查询途径）
    - AWS CloudTrail 控制台（无法根据服务筛选）
        
        ![image](https://github.com/user-attachments/assets/2ef72d48-a8f2-4b52-8c99-3d3ae1297f2f)
        
    - AWS CLI 或 SDK 文档（注意大小写，找到之后最好去 CloudTrail 控制台核实）
        
        https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/index.html
        
        ![image](https://github.com/user-attachments/assets/ef4d4267-777d-401d-af41-0a2b150f3e91)
        
    - 第三方 CloudTrail 事件名称列表（数据不是最新）
        
        https://www.gorillastack.com/blog/real-time-events/cloudtrail-event-names/
        
        ![image](https://github.com/user-attachments/assets/333beb40-295a-449c-9d3a-aa9ae5d96ddd)
        
    - 第三方 CloudTrail 事件名称查询器（数据不是最新）
        
        https://www.intelligentdiscovery.io/tools/cloudtrailevents
        
        ![image](https://github.com/user-attachments/assets/5982828b-3ffe-414f-b417-ee44c2920e90)
        
3. 确认 Resource Explorer 中的资源类型
    
    https://docs.aws.amazon.com/zh_cn/resource-explorer/latest/userguide/supported-resource-types.html
    
    ![image](https://github.com/user-attachments/assets/4da60dd5-d509-4d8b-b908-1c45f3260e3c)
    
4. 在 S3 中找到开头为 `resourceautotagcdkstack-resourceautotagbucket` 的桶，下载桶中的 `mapping.json` 文件
    
    ![image](https://github.com/user-attachments/assets/35c1e12b-1895-4dec-a23f-d1518a594e2b)
    
5. 编辑该 JSON 文件，添加上述 EventName、EventSource、ResourceType
    
    ```json
    {
        "CTEventName" : "CreateDBCluster", 
        "CTEventSource": "rds.amazonaws.com",
        "REResourceType": "rds:cluster",
        "Global": false
    },
    {
        "CTEventName" : "CreateDBInstance", 
        "CTEventSource": "rds.amazonaws.com",
        "REResourceType": "rds:db",
        "Global": false
    }
    ```
    
    全局属性仅适用于全局唯一的资源（例如 S3 存储桶）
    
6. 将修改后的 `mapping.json` 文件上传覆盖即可。
7. 在 IAM Role 中找到 inlinePolicy 并编辑
    
    ![image](https://github.com/user-attachments/assets/fc92ab98-93e5-4901-b5fa-a2a68d8fb66c)
    
8. 针对上文中 RDS 的自动标签例子，则需要新增的权限为：
    
    ```json
    {
        "Effect": "Allow",
        "Action": "rds:AddTagsToResource",
        "Resource": [
            "arn:aws:rds:*:*:cluster:*",
            "arn:aws:rds:*:*:db:*"
        ]
    }
    ```
