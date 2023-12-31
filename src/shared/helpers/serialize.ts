
import cloneDeep from "lodash.clonedeep";

type Serialize = {
	export: (method: "score" | "name", name?: string) => void;
	json: () => string;
	split: () => Slice[];
	[key: string]: any;
}

export type Slice = {
	setAuthor: (id: string, name: string, data: any, key: string, score: number) => void;
	deleteAuthor: (id: string) => null | void;
	setScoreByAuthorId: (id: string, value: "+" | "-", itemKey: string, author: string) => null | number;
	setDataByAuthorId: (id: string, data: any, key: string) => null | void;
	getDataId: () => string;
	author: any[];
	[key: string]: any;
}

type Split = () => Slice[];

function serialize(datas: any): Serialize {
	
	let data = cloneDeep(datas);
	let exportst: any[] = [];
	let slices: any = [];

	function printKeyValuePairs(obj: any): void {

		if (typeof obj === "object" && obj !== null) {

			for (let key in obj) {

				let value = obj[key];

				if (typeof value === "object" && value !== null) {

					printKeyValuePairs(value);

				} else {

					if (obj.setAuthor === undefined && obj.__isAuthorElement === undefined) {
						
						Object.defineProperties(obj, {
							setAuthor: {
								value: function(id: string, name: string, data: any, key:string , score: number) {

									if (!Array.isArray(this.author)) {
										obj.author = [];
									}
									
									obj.author.push({ id: id, name: name, [key + "__score__"]: 0, [key]: data, score_plus: [], score_minus: []  , __isAuthorElement: "__isAuthorElement" });
								},
								enumerable: true
							},

							deleteAuthor: {
								value: function(id: string) {

									if (!Array.isArray(obj.author)) {
										return null;
									}

									obj.author.forEach((item: any, index: number, arr: any) => {
										if(arr[index].id === id) {
											arr.splice(index, 1);
										}
									})
								},
								enumerable: true
							},

							setScoreByAuthorId: {	
								value: function(id: string, value: "+" | "-", itemKey: string, author_id: string) {
									if(!Array.isArray(this.author)) {
										return null;
									}
									let score = 0;
									obj.author.forEach(function(item: any, index: number, array: any) {
										if (item.id === id) {
											if(value === "+") {
												if (!item.score_plus.includes(author_id)) {
													item.score_plus.push(author_id);
													const index = item.score_minus.indexOf(author_id)
													if (index !== -1) {
														item.score_minus.splice(index, 1);
													}
													
													item[itemKey + "__score__"]++;
												} else if (item[itemKey + "__score__"] === 0) {
													item[itemKey + "__score__"]++;
												}

											} 
											if (value === "-") {
												if (!item.score_minus.includes(author_id)) {
													item.score_minus.push(author_id);
													const index = item.score_plus.indexOf(author_id)

													if (index !== -1) {
														item.score_plus.splice(index, 1)
													}
													item[itemKey + "__score__"]--;
												} else if (item[itemKey + "__score__"] === 0) {
													item[itemKey + "__score__"]--;
												}
											}
											score = array[index][itemKey + "__score__"]
										}								
									});
									
									return score;
								},
								enumerable: true
							},

							setDataByAuthorId: {
								value: function(id: string, data: any, key: string) {
									if(!Array.isArray(this.author)) {
										return null;
									}
									
									obj.author.forEach(function(item: any, index: number, array: any) {
										if (item.id === id) {
											array[index][key] = data;
										}								
									});
								},
								enumerable: true
							},

							exports: {
								value: function(method: "score" | "name", name?: string) {
									
									if (obj.author) {

										if (method === "score")	{
											const authorKeys = Object.entries(obj).map(([key, value]) => {
												
												if(typeof value !== "function" && typeof value !== "object") {
													return key;
												}
											})
											.filter((item) => {
												return item ? true : false
											})

											

											obj.author.sort((a: { [key: string]: number }, b: { [key: string]: number }) => {
												const key = authorKeys.find((item) => {
													return typeof a[item + "__score__"] === "number" 	
												})
												return a[key + "__score__"] < b[key + "__score__"]
											});
											const temp = obj.author[0];
											const keys = Object.keys(temp);
											keys.forEach((item) => {
												for(let i in obj){
													if (item == i && typeof obj[item] !== "function" ) {
														obj[item] = temp[item]
													}
												}
											})
											
											delete obj.author;
											
										}

										if (method === "name") {
											const i = obj.author.find((item: any, index: number) => {

												if(item.name === name) {
													return index;
												}

											})

											const temp = obj.author[i].data;
											const keys = Object.keys(temp);
											keys.forEach((item) => {
												for(let i in obj){
													if (item == i && typeof obj[item] !== "function" ) {
														obj[item] = temp[item]
													}
												}
											})
											delete obj.author;
										}
									}
								},
								enumerable: true
							},
						}); 
						exportst.push(obj.exports);
						let temp: any = {};
						for(let j in obj) {
							if (typeof(obj[j]) !== "object") {
								temp[j] = obj[j];
							} else if (j === "author") {
								temp[j] = obj[j]
							}
												
						}
	
						slices.push(temp);
					}
				}
			}
		}
	}

	printKeyValuePairs(data);

	Object.defineProperties(data, {
		export: {
			value: function(method: "score" | "name", name?: string) {
				
				exportst.forEach((item:Function) => {
					item(method, name);
				})
			},
			enumerable: true,
		},
		json: {
			value: function() {
				return JSON.stringify(this);
			}
		},
		split: {
			value: function():Split {
				return slices;
			}
		}
	})
	
	return data
}

function split(data: any): any[]{
	let slices: any = [];
	let result = cloneDeep(data)

	function printKeyValuePairs(variable: any): void {

		if (typeof variable === "object" && variable !== null) {

			for (let key in variable) {

				let value = variable[key];

				if (typeof value === "object" && value !== null) {

					printKeyValuePairs(value);

				} else {
						
					if (variable.__visited === undefined){
						Object.defineProperties(variable, {
							__visited: {
								value: true
							},
							__id : {
									value:"id" + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2) 
								},
						});
						let temp: any = {};
						for(let j in variable) {
							if (typeof(variable[j]) !== "object") {
								temp[j] = variable[j];
							}
						}
						slices.push(temp);
					}
				}
			}
		}
	}
	
	printKeyValuePairs(result);

	return slices;
}


export { serialize, split }


