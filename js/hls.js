function HLS() {}

HLS.prototype = {
  on: function(evsig, cb) {
    //
  }
}

// http client
HLS.Client = function() {}

HLS.Client.prototype = {
  get: function(url, good, bad) {
    var xhr = new XMLHttpRequest();
    var now = new Date().getTime();
    xhr.onreadystatechange = function() {
      console.log("readyState: " + xhr.readyState);
      if (xhr.readyState == 4) {
        var elapsed = new Date().getTime() - now;
        if (xhr.status == 200 || xhr.status == 0) good(xhr, elapsed);
        else bad(xhr, elapsed);
      }
    }

    xhr.ontimeout = function() {
      console.log("Timeout");
      bad(xhr, elapsed)
    }

    console.log("GET " + url);
    xhr.open('GET', url, true);
    xhr.send();
  }
}

// M3U8 wrapper
HLS.M3U8 = function(url) {
  this.url = url;
}

HLS.M3U8.prototype = {
  get: function() {
    var self = this;
    new HLS.Client().get(this.url, function(xhr, elapsed) {
      console.log("got " + self.url + " in " + elapsed + ":", xhr);
      console.log(xhr.responseText);
      self.update(self.parse(xhr.responseText));
    },
    function(xhr, elapsed) {
      console.log("error: ", xhr);
    });
  },
  update: function(pl) {
    //
  },
  parse: function(m3u8) {
    var ln = m3u8.replace(/\r/g, '').split("\n");
    return null;
  }
}
