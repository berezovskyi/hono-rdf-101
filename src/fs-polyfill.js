import { ReadableStream, WritableStream } from "web-streams-polyfill";

export function createReadStream() {
   return new ReadableStream();
}

export function createWriteStream() {
   return new WritableStream();
}

// export function statSync() {
//    return {
//       dev: 2114,
//       ino: 48064969,
//       mode: 33188,
//       nlink: 1,
//       uid: 85,
//       gid: 100,
//       rdev: 0,
//       size: 527,
//       blksize: 4096,
//       blocks: 8,
//       atimeMs: 1318289051000.1,
//       mtimeMs: 1318289051000.1,
//       ctimeMs: 1318289051000.1,
//       birthtimeMs: 1318289051000.1,
//       atime: new Date(),
//       mtime: new Date(),
//       ctime: new Date(),
//       birthtime: new Date()
//    }
// }

// export function promises() {}