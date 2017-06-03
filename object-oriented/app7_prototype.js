

const parent = {name: "Alex"};

const ownProps = {age: 34};

const child = Object.create(parent, {age: {value: 34}, type: {value: "child"}}
);

console.log(child);
