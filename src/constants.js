const categories = 'business,politics,technology,sport,food,world,travel,culture,film,fashion,science';
const KEY = '7028529f-6d71-4337-ba77-b1df1da7c306';
//const KEY = '829c4e68-c5a7-43fa-8a81-ed2e567dc96a';
//const KEY = '3ae95137-e96f-4e42-913e-95176c77272f';
const PARAMS = {"api-key": KEY, "page-size":40, "show-fields": "headline,body,thumbnail,wordcount,trailText,byline"};

export {categories,KEY,PARAMS};