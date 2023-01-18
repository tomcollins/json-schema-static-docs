---
title: Support
description: Detailed description of support for JSON schema keywords
permalink: /support/
---

# JSON Schema Support

This page describes current ssupport for JSON schema keywords.

## Core Vocabulary

Coverage for [The JSON Schema Core Vocabulary](https://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.8.1).

| Keyword            | Supported |
| :----------------- | :-------- |
| `$anchor`          | No        |
| `$comment`         | Yes       |
| `$defs`            | Yes       |
| `$id`              | Yes       |
| `$recursiveAnchor` | No        |
| `$recursiveRef`    | No        |
| `$ref`             | Yes       |
| `$schema`          | Yes       |
| `$vocabulary`      | No        |

## A Vocabulary for Applying Subschemas

Coverage for [A Vocabulary for Applying Subschemas](https://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.9).

| Keyword                 | Supported |
| :---------------------- | :-------- |
| `additionalItems`       | No        |
| `additionalProperties`  | Yes       |
| `allOf`                 | Yes       |
| `anyOf`                 | Yes       |
| `contains`              | No        |
| `dependentSchemas`      | No        |
| `else`                  | No        |
| `if`                    | No        |
| `items`                 | Yes       |
| `not`                   | No        |
| `oneOf`                 | Yes       |
| `patternProperties`     | No        |
| `properties`            | Yes       |
| `propertyNames`         | No        |
| `then`                  | No        |
| `unevaluatedItems`      | No        |
| `unevaluatedProperties` | No        |

## Validation Keywords for Any Instance Type

Coverage for [Validation Keywords for Any Instance Type](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.1).

| Keyword | Supported |
| :------ | :-------- |
| `const` | Yes       |
| `enum`  | Yes       |
| `type`  | Yes       |

## Validation Keywords for Numeric Instances

Coverage for [Validation Keywords for Numeric Instances](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.2).

| Keyword            | Supported |
| :----------------- | :-------- |
| `exclusiveMaximum` | Yes       |
| `exclusiveMinimum` | Yes       |
| `maximum`          | Yes       |
| `minimum`          | Yes       |
| `multipleOf`       | Yes       |

## Validation Keywords for Strings

Coverage for [Validation Keywords for Strings](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.3).

| Keyword     | Supported |
| :---------- | :-------- |
| `maxLength` | Yes       |
| `minLength` | Yes       |
| `pattern`   | Yes       |

## Validation Keywords for Arrays

Coverage for [Validation Keywords for Arrays](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.4).

| Keyword       | Supported |
| :------------ | :-------- |
| `maxContains` | No        |
| `maxItems`    | No        |
| `minContains` | No        |
| `minItems`    | No        |
| `uniqueItems` | No        |

## Validation Keywords for Objects

Coverage for [Validation Keywords for Objects](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.5).

| Keyword             | Supported |
| :------------------ | :-------- |
| `dependentRequired` | No        |
| `maxProperties`     | No        |
| `minProperties`     | No        |
| `required`          | Yes       |

## Defined Formats

Coverage for [Defined Formats](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.7.3).

| Keyword                 | Supported |
| :---------------------- | :-------- |
| `date`                  | Yes       |
| `date-time`             | Yes       |
| `duration`              | Yes       |
| `email`                 | Yes       |
| `hostname`              | Yes       |
| `idn-email`             | Yes       |
| `idn-hostname`          | Yes       |
| `ipv4`                  | Yes       |
| `ipv6`                  | Yes       |
| `iri`                   | Yes       |
| `iri-reference`         | Yes       |
| `json-pointer`          | Yes       |
| `regex`                 | Yes       |
| `relative-json-pointer` | Yes       |
| `time`                  | Yes       |
| `uri`                   | Yes       |
| `uri-reference`         | Yes       |
| `uri-template`          | Yes       |
| `uuid`                  | Yes       |

## A Vocabulary for the Contents of String-Encoded Data

Coverage for [A Vocabulary for the Contents of String-Encoded Data](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.8) is 100%.

| Keyword            | Supported |
| :----------------- | :-------- |
| `contentEncoding`  | No        |
| `contentMediaType` | No        |
| `contentSchema`    | No        |

## A Vocabulary for Basic Meta-Data Annotations

Coverage for [A Vocabulary for Basic Meta-Data Annotations](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.9).

| Keyword       | Supported |
| :------------ | :-------- |
| `default`     | No        |
| `deprecated`  | No        |
| `description` | Yes       |
| `examples`    | Yes       |
| `readOnly`    | No        |
| `title`       | Yes       |
| `writeOnly`   | No        |
