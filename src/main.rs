use std::fmt;

fn main() {
  let b = vec![0, 1, 2, 3, 4, 5, 6];
  let s = 7;
  let a = vec![8, 9, 10, 11, 12];

  let sel = SelectList(b, s, a);

  // let SelectList(before, after, selected) = sel;

  for x in sel.iter() {
    println!("{:#?}", x);
  }

  // println!("{:?}", before);
  // println!("{:?}", selected);
  // println!("{:?}", after);

  // match sel {
  //   SelectList(a, b, c) => println!("{:?} {:?} {:?}", a, b, c),
  //   _ => println!("het there"),
  // }
}

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
enum Position {
  Before,
  Selected,
  After,
}

struct SelectList<A>(Vec<A>, A, Vec<A>);

// You can create a new struct which will contain a reference to your set of data.
struct IterNewType<'a, T: 'a> {
  inner: &'a SelectList<T>,
  // And there is a position used to know where you are in your iteration.
  pos: usize,
}

// Now you can just implement the `Iterator` trait on your `IterNewType` struct.
impl<'a, T> Iterator for IterNewType<'a, T> {
  type Item = &'a T;

  fn next(&mut self) -> Option<Self::Item> {
    if self.pos >= self.inner.0.len() {
      // Obviously, there isn't any more data to read so let's stop here.
      None
    } else {
      // We increment the position of our iterator.
      self.pos += 1;
      // We return the current value pointed by our iterator.
      self.inner.0.get(self.pos - 1)
    }
  }
}

impl<A> SelectList<A> {
  // fn from_lists(&self) {}

  // fn from_lists(before: Vec<T>, selected: T, after: Vec<T>) -> SelectList<T> {
  //   SelectList(before, selected, after)
  // }

  fn iter<'a>(&'a self) -> IterNewType<'a, A> {
    IterNewType {
      inner: self,
      pos: 0,
    }
  }

  // pub fn map<B, F>(&mut self, mut f: F) -> SelectList<B>
  // where
  //   F: FnMut(&A) -> B,
  // {
  //   let SelectList(before, selected, after) = self;

  //   SelectList(
  //     before.iter().map(f).collect(),
  //     f(selected),
  //     after.iter().map(f).collect(),
  //   )
  // }
}

// enum SelectList<T> = {
//   Before(Vec<T>),
//   Selected(T),
//   After(Vec<T>),
// }
