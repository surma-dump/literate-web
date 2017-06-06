/**
 * This function does things.
 */
function show_me_things() {
  // First, we need to do things.
  doThings();
  waitForThingsToBeGood();
  for await (const thing of goodThings()) {
    polishThing(thing);
    // We need to invert names.
    thing.names.map(name => name.inverse());
  }
  // Let’s tell the world about it. More about `magicGlobal` in the [documentation](http://example.com).
  magicGlobal.echo();
}
