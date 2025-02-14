import _ from 'lodash';
import { count, increment } from './incrementer.js';
import foo from './foo.js';
// console.log('count', count); // 0
// increment();
// console.log(count); // 1

export default function main () {
	console.log('foo', foo);
	console.log('get12', _.get({ a: 1}, 'a', 1));
	// count += 1;
}

main();