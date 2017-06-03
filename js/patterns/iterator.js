

const obj = (function() {

  let data = ["elem1", "elem2", "elem3"]
      ,index = 0;

  return {
    current: () => {
      return data[index];
    }
    ,curIndex: () => {
      return index;
    }
    ,step: function(int) {
      if( !this.hasNext() || (index + int) >= data.length ) {
        return null;
      } else {
        index += int || 1;
        return data[index]
      };
    }
    ,next: function(int) {
      if( !this.hasNext() || (index + int) >= data.length ) {
          return null;
      } else {
        return data[(index + int) || 1]
      };
    }
    ,hasNext: () => {
      return index < (data.length - 1);
    }
    ,stepBack: function(int) {
      if( (index - (int || 1) ) < 0 ) {return null}
      index -= (int || 1);
      return data[index];
    }
    ,previous: function(int) {
      let a = index - (int || 1);
      return a < 0 ? null : data[a];
    }
    ,rewind: () => {
      index = 0;
    }
  };

})();
