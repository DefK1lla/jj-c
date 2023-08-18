
import cloneDeep from "lodash.clonedeep";

type Serialize = {
	export: (method: "score" | "name", name?: string) => void;
	json: () => string;
	split: () => Slice[];
	[key: string]: any;
}

export type Slice = {
	setAuthor: (id: string, name: string, data: any, score: number) => void;
	deleteAuthor: (id: string) => null | void;
	setScoreByAuthorId: (id: string, score: number) => null | void;
	setDataByAuthorId: (id: string, data: any) => null | void;
	getDataId: () => string;
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

					if (obj.setAuthor === undefined) {
						
						Object.defineProperties(obj, {
							__id : {
								value:"id" + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2) ,
								
							},
							setAuthor: {
								value: function(id: string,name: string, data: any, score: number) {

									if (!Array.isArray(this.author)) {
										this.author = [];
									}

									this.author.push({ id: id, name: name, score: score, data: data });
								},
								enumerable: true
							},

							deleteAuthor: {
								value: function(id: string) {

									if (!Array.isArray(obj.author)) {
										return null;
									}

									this.author.forEach((item: any, index: number, arr: any) => {
										if(arr[index].id === id) {
											arr.splice(index, 1);
										}
									})
								},
								enumerable: true
							},

							setScoreByAuthorId: {	
								value: function(id: string, score: number) {
									if(!Array.isArray(this.author)) {
										return null;
									}
									
									this.author.forEach(function(item: any, index: number, array: any) {
										if (item.id === id) {
											array[index].score = score;
										}								
									});
								},
								enumerable: true
							},

							setDataByAuthorId: {
								value: function(id: string, data: any) {
									if(!Array.isArray(this.author)) {
										return null;
									}
									
									this.author.forEach(function(item: any, index: number, array: any) {
										if (item.id === id) {
											array[index].data = data;
										}								
									});
								},
								enumerable: true
							},

							exports: {
								value: function(method: "score" | "name", name?: string) {
									delete obj.__id;
									if (obj.author) {

										if (method === "score")	{

											obj.author.sort((a: { score: number }, b: { score: number }) => {
												return a.score > b.score ? -1 : 1;
											});

											const temp = obj.author[0].data;

											for(let key in temp) {
												obj[key] = temp[key];
											}

											delete obj.author;
											
										}

										if (method === "name") {
											const i = obj.author.find((item: any, index: number) => {

												if(item.name === name) {
													return index;
												}

											})

											const temp = obj.author[i].data;

										}
									}
								},
								enumerable: true
							},

							getDataId: {
								value: function () {
									return obj.__id;
								},
								enumerable: true
							}
						}); 
						exportst.push(obj.exports);
						let temp: any = {};
						for(let j in obj) {
							if (typeof(obj[j]) !== "object") {
								temp[j] = obj[j];
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
					item(method);
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


