# aws-vanity-converter

A serverless project that uses AWS Lambda & AWS DynamoDB with Amazon Connect to generate, store, and send vanity phone numbers. 

## Development

### System Requirements

- AWS CLI
- SAM CLI
- Node.js v14 or higher
- Docker
- npm

### Getting Started

1. Clone the repository.

```bash
git clone https://github.com/cam-peck/aws-vanity-converter.git
cd aws-vanity-converter
```

2. Install all dependencies with npm.

```bash
npm install
```

3. Build the project via SAM.

```bash
sam build
```

4. Deploy the project.

```bash
sam deploy --guided
```

### Testing
1. Unit tests are defined in `~/convert-number/tests` folder. To run tests while you are in `~/convert-number`...

```bash
npm run test
```

2. To run an Amazon Connect test event, either use the provided event in `~convert-number/events` or add your own `event.json` in the `events` folder. To run tests while you are in `~/aws-vanity-converter`...

```bash
sam local invoke NumberToVanityFunction -e events/event.json 
```

### Cleanup

1. To delete the sample application that you created, use the AWS CLI.

```bash
aws cloudformation delete-stack --stack-name aws-vanity-converter
```

## Writing and Documentation

1. Record your reasons for implementing the solution the way you did, struggles you faced, and problems you overcame.

One of the first (and probably the biggest) struggles I ran into was getting my repo setup & linked up with AWS. I skimmed through a few YouTube videos to get an idea for project setup, and noticed that most people used the AWS CLI in combination with either `AWS SAM` or the `serverless` npm package. I'm a big fan of "install the package and play around with it to decide if you like it", so I installed `serverless` to try out first. After an hour or so I had a repo up and running, but had little to no idea what was going on -- their video on setting up a project covered AWS CLI, AWS-sdk, DynamoDB, Lambda, and AWS APIs in 8 minutes. Great for getting a project rolling quickly -- not great for learning. I uninstalled `serverless`, and using a phenomenal LinkedIn course by Daniel Bloy along with the AWS documentation on SAM, slowly worked through setting up my project. The big lightbulb moment for me was understanding the purpose of the `template.yaml` file and CloudFormation. AWS' great documentation on the YAML file and AWS SAM was a lifesaver throughout both the setup & coding phases of the project.

Next was coding up the Lambda Function. I broke the problem up into two large pieces --> 1. generate every possible letter combination for a given number & 2. choose the best vanity numbers from that combination list. Creating a "perfect" vanity-converter is a big task, so I did some research on vanity numbers to scope down the problem. Most numbers used either a 7-letter combination (1-800-MATTRESS & 1-800-GoFedEx) or a 3-4 combination (1-800-BUY-SELL & 1-800-FOR-HVAC), so I decided to focus on 7 & 4 letter words. 3-4 could happen if I had extra time at the end, but I didn't want to worry about word order, valid combinations, etc. With the planning done, the coding went pretty smoothly. If I had more time, I'd definitely try to tackle the 3-4 combination problem. I also wrote my unit tests for chooseBestVanity and generateVanityWords after completing the functions to "shortcut" coding up the functions. Definitely should write those up in advance... :-). 

The final part of the project was integrating DynamoDB. I ran into another setup issue here on whether to use `aws-sdk(v2)` or `aws-sdk(v3)`. After finding out that v3 offered modular imports and had better `async / await` support, the decision was pretty easy. I only needed the DynamoDB portion and I love `async / await` so... I went with v3. Before coding everything up, I also did some research on noSQL databases since my previous experience was with `postgreSQL`. I learned a lot about scalability, structured vs unstructured data, and CAP/ACID. Ultimately though, the syntax for querying the database was similar to what I'd done with `postgreSQL`, so no big problems during coding there. I also added a `GET` route to check for already existing vanity numbers for a caller. I also ensured that the lambda function associated with the database only had `GET` and `PUT` (this not being `POST` did throw me for a loop~!) access via the AWS dashboard. With more time, I'd like to setup the `template.yaml` file to implement those permissions instead of doing it manually --> that'd make it a lot easier for someone to download and start using my project.

With some more time, I'd definitely take a deeper look at my dictionary banks. The dictionaries are currently stored as arrays, which search in O(n) whereas an object would search in O(1) (yay hash-maps!). I'd also like to expand the size of both dictionaries, but I didn't find a great npm package for this beyond `an-array-of-english-words`, which contains words of all letters and is also an array. I also need to add more unit tests, but I think I'll have time to do that before turning in the project Tuesday night. In production, would definitely want to write those tests first instead of after... :-). Great learning project -- thanks!