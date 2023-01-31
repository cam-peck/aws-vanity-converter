# aws-vanity-converter

This application uses AWS Lambda, AWS DynamoDB, and AWS Connect to create, store, and read vanity numbers to users that call into a call center. To try out the application, call the number `316-816-0480`. Currently, only US numbers without a 0 or 1 in the last four digits are supported.

## Development

### System Requirements

- AWS CLI (https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- SAM CLI (https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- Node (https://nodejs.org/en/download/)
- Docker (https://docs.docker.com/get-docker/)

### Getting Started

1. Ensure the AWS CLI, SAM CLI, node, and docker are installed.

```
aws --version
sam --version
node --version
docker --version
```

2. If you need to setup your AWS credentials... (https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)

```
aws configure
```

3. Clone the repository.

```bash
git clone https://github.com/cam-peck/aws-vanity-converter.git
cd aws-vanity-converter
```

4. Install all dependencies with npm.

```bash
npm install
```

5. Build the project via SAM.

```bash
npm run build
```

5. Deploy the project.

```bash
npm run guided-deploy
```

### Permissions

AWS uses the IAM to determine access priviledges across all AWS Services. You'll need to add a permission for the lambda function to access the DynamoDB table. 

1. Sign into the AWS console, navigate to the IAM page, and create a policy with the below JSON data. Make sure to add the ARN for your dynamoDB table under `Resource:`.

```
{

    "Version": "2012-10-17",

    "Statement": [

        {

            "Sid": "VisualEditor0",

            "Effect": "Allow",

            "Action": [

                "dynamodb:PutItem",

                "dynamodb:GetItem"

            ],

            "Resource": <add the ARN for your DyamoDB table here>

        }

    ]

}
```

2. Ensure you attach the policy to the current project via the `roles` tab.

### Amazon Connect Contact Flow

Amazon Connect recently added support for importing & exporting contact flows. Follow the directions below to set up a contact flow in Amazon Connect.

1. Open the file `contact-flow/vanity-number-flow` in your code editor. Add the ARN for your lambda function to line 152. You can grab this ARN either from the AWS console or from the output when you deploy your project.

2. Sign into the AWS console in your browser. Add an Amazon Connect instance, and sign into your instance.

3. Create a new contact flow. Using the small arrow at the top right of the screen, click `Import`. Locate the `vanity-number-flow` edited in step 1, and add it to the board.

4. You're good to go! Call any number attached to your Connect Instance to test the project.

### Testing
1. Unit tests are defined in `~/tests\unit` folder. Run tests via...

```bash
npm run test
```

2. To run an Amazon Connect test event, use either the provided events in `aws-vanity-converter/events` or add your own `event.json` in the `events` folder. To run a test event...

```bash
sam local invoke NumberToVanityFunction -e events/valid-event.json
```

### Cleanup

1. To delete the sample application that you created, use the AWS CLI. Assuming you named your app `aws-vanity-converter`...

```bash
aws cloudformation delete-stack --stack-name aws-vanity-converter
```

## Writing and Documentation

The first thing I did after recieving the project was scope out the requirements. This was the first project I've developed using AWS serverless in VSCode, so I figured setting up the repo would take at **least** a day or two. I laid out another day for the lambda function, and a fourth day for integrating DynamoDB. The last day would be cleanup. With my plan in hand, I got to setting up my repository.

### Why AWS SAM?

I started with research on AWS serverless project setup via YouTube, AWS documentation, and various blogs. `AWS SAM` and `serverless` kept coming up, so I decided to play around with both tools to figure out which one I liked more. I tried out `serverless` first, and while I had a repo up and running in about an hour, their 8 minute set-up video left me with more questions than answers. Around this time I also reached out to a friend, who recommended I check out Daniel Bloy's Amazon Connect LinkedIn course. Following along with his course, I got the AWS CLI set-up, and installed AWS SAM along the way while sifting through AWS Documentation. I played around with the template.yaml file a LOT, and after reading a bunch about CloudFormation, had a much better idea of how AWS ran my code. Huge shoutout to Daniel Bloy's course. 


### Vanity Number Lambda Function

I broke the vanity-number-problem up into two pieces. 
1. Generate every possible letter combination for a given number.
2. Choose the best vanity numbers from that combination list. 

Generating all the letter combinations was pretty straightforward. I used an object to store numpad letter data, and using a few nested for loops got all the possible 4 and 7 letter words for a given phone number. I decided to use only 4 and 7 letter words to keep the project straightforward. I also coded up a helper function to check for valid US numbers and weed out numbers with a 1 or 0 in the last four digits (since those numkeys don't have letters).  With more time, I'd like to expand this function out to also check for 3-4 word pairs (like 1-800-BUY-SELL) as well as deal with phone numbers that include a 1 or 0. I'd also like to optimize the function that chooses the best vanity numbers. I also took a bad-production-practice shortcut here -- I wrote up all of my unit tests after coding up the functions. Should definitely do those before. :-)

### DynamoDB Integration

The final part of the project was integrating DynamoDB. I ran into another setup issue here -- whether to use `aws-sdk(v2)` or `aws-sdk(v3)`. After finding out that v3 offered modular imports and had better `async / await` support, the decision was pretty easy. I only needed the DynamoDB portion and I love `async / await` so... I went with v3. The syntax for querying the database was similar to what I'd done with `postgreSQL`, so no big problems during coding there. I did run into a permissions error while testing the code, which I resolved by creating a custom `Dynamo PutItem & Dynamo GetItem` permission for my lambda function. Minimum permissions required is good! With more time, I'd like to set-up the `template.yaml` file to implement those permissions instead of doing it manually --> that'd make it a lot easier for someone to download and start using my project. To finish off the Dynamo integration, I added a `GET` route to check if a number already existed in the database --> no need to do all the algo work twice. 

### Closing Notes

Overall, I really enjoyed working with AWS Serverless and learned a lot about AWS CLI, SAM CLI, AWS Lambda, AWS DynamoDB, AWS CloudFormation, AWS IAM, and Amazon Connect. In a production environment, I'd definitely want to meet with the client up-front to figure out a call-flow design that works best for them. It'd also be good to clarify concrete details on the vanity-converter-function --> the client may only want 7 digit vanity codes, which would change the function quite a bit. While I did my best to keep good `git` workflow for this project, I'd also want want my project peer-reviewed by another engineer at VoiceFoundry before deployment. There's always room for improvement~! Thanks for a great project! 
