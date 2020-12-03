# Questions and Answers API Endpoints

## Create Questions

Users are able to save questions related to a product.

```POST** /api/:id/questions```

### Parameters

None

### Returns

Returns the posted question.

```javascript
[{
  "productId”: 1,
  "id": 1,
  "question": "I have never used a pressure cooker. Is it easy for a beginner to get the hang of the instant pot?",
  "createdBy": "maverick",
  "createdAt": "2020-06-14"
}]
```

### Status codes

**200:** Successfully post the question
**404:** Unsuccessful attempt due to missing resource

## Create Answers

Users are able to save answers related to a product.

```POST /api/:id/answers```

### Parameters

*questionId:* The question to which the answer was provided.

### Returns

Returns the posted answer.

```javascript
[{
  "id": 1,
  "questionId": 1,
  "answer": "There is also a group on Facebook, Instant Pot 101. Lots of really great help and recipes",
  "createdBy": "maverick",
  "createdAt": "2020-06-14",
  "helpful": 4,
  "notHelpful": 2
}]
```

### Status codes

**200:** Successfully post the answer
**404:** Unsuccessful attempt due to missing resource

## Update Helpful or Not Helpful flags

Users are able to flag the answers.

```PUT /api/:id/flag```

### Parameters

*questionId:* The question to which the answer was provided.
*answerId:* The answer to which the flag was marked.
*Flag:* helpful or notHelpful

### Returns

Returns the flag details.

```javascript
[{
  "answerId": 1,
  "flag": "helpful",
  "count": 10
}]
```

### Status codes

**200:** Successfully post the helpful or not helpful flag
**404:** Unsuccessful attempt due to missing resource

## Read Questions and Answers

Question and Answers are uploaded once the Q&A tab is clicked

```GET /api/:id/q-and-a```

### Parameters

*sort by:* newest answers, newest questions, fewest answers, most answers

### Returns:

Returns the sorted list of question and answer.

```javascript
{
  "productId": 123316,
  "questions": [{
    "questionId": 1,
    "question": "I have never used a pressure cooker. Is it easy for a beginner to get the hang of the instant pot?",
    "createdBy": "mah jong player",
    "createdAt": "2018-01-01",
    "answers": [{
      "answerId": 1,
      "answer": "Yes, there are lots of people eager to help with their suggestions and recipes on YouTube! Read your owner's manual and perform the water test first. This helps you understand how it works. Have had mine for a month now and use it every day! Fish and veggies done at once in the same pot, just an example...",
      "createdBy": "Sherrie",
      "createdAt": "2019-05-20",
      "helpful": 12,
      "notHelpful": 7
    }]
  }]
}
```

### Status codes

**200:** Successfully post the helpful or not helpful flag
**404:** Unsuccessful attempt due to missing resource

## Delete Questions and Answers

Users are able to delete questions and answers.

```DELETE /api/:id/q-and-a```

### Parameters

None

### Returns

None

### Status codes

**200:** Successfully delete the questions and answers
**404:** Unsuccessful attempt due to missing resource