/* eslint-disable max-len */

/**
 * Change the type of an empty Record to be `undefined`
 *
 * Example: https://www.typescriptlang.org/play?#code/C4TwDgpgBAqgzhATlAvFA3gKCjqA7AQwFsIAuKOYRASzwHNtcAbAygOWLIqtoYF9MmUJCgBRImFCoMAzAHoAVAuwKoAYQAWBetGAbd4aAHsAZlG1QIEqQCUIAYyOIAJlGBGoAI2gADAK54zhAmtBDOPipymBAAHmBOwG6GsIHBoeKSIHaOLgA8APKeAFaWMcAQgXBQ2U7OuZQ09AA05nggAHzt0oUlseWV1Q619TzN+BAAbkhdAPxQAUEheGFQ5D2CwtBsRngZoDUu0jCpSxB7WUN58NPycrgAejMbyecHrmjHi+nWFzl15+1bg8ZkA
 */
export type UndefineEmptyRecord<Obj extends Record<string, any>> = Obj extends Record<string, never> ? undefined : Obj

/**
 * Remove properties that have `never` values from a Record
 *
 * Example: https://www.typescriptlang.org/play?#code/C4TwDgpgBAggJnAThAziqBeKBvAUFAqAYwEtQAuKFYREgOwHN9CiB7AVzppEutsdwBfXLlCRYRNp2CYczAuxQRElOhABuy+VAAWrALYR4SVCkrHkaKAB8onOBABm9CHG0B3VogDWF0+YRLFCERAHoAKnD8cKgAJQh9Vk0oMERWSERgElQoYB0AQxkC5IADNU1EEqh1fIAbdhzHNP0ofLiINkQ3KHDQ3AgADzAvGTFoAHl9MgA5DWUASTp4zrgAHnGAIwArKEHgCDo4dGWvNb56BgAaVroQAD472TwASABtAGkIECh6KG8v1iOKCbHb5dAgj5fAC6uwG+0O6HKyigAH4oEjEFBKJ8QFDKBCcVCQqJwNAAGIkWr7ZBwE5dWSTGZzRCLOlrGCSDhcO64UKhQgAPRRQA
 */
export type OmitKeyAndUndefineRecordForUnion<Union, Key extends string> =
	| UndefineEmptyRecord<Omit<NonNullable<Union>, Key>> // Omit key from all the Records and check for `undefined`
	| Exclude<Union, NonNullable<Union>> // Keep other types in the Union
