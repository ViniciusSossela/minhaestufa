var GoogleForm = function (link) {
  var findViewform = link.lastIndexOf('viewform')
  if (~findViewform)
    link = link.slice(0, findViewform - 1)
  this.link = link + '/formResponse?ifq'
  this.data = {}
}

GoogleForm.prototype.addField = function (name, data) {
  data = data || ''

  var field = {}
  field[name] = data
  Object.assign(this.data, field)
}

GoogleForm.prototype.setAllFields = function (data) {
  this.data = data
}

GoogleForm.prototype.send = function (isAsyn) {
  isAsyn = isAsyn || false

  var XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest
  var xhr = new XHR()
  var data = ''
  for (var name in this.data) {
    data += '&' + name + '=' + encodeURIComponent(this.data[name] || '')
  }

  var sendDataGoogle = this.link + data + '&submit=Submit'
  console.log(sendDataGoogle)

  xhr.open('GET', sendDataGoogle, isAsyn)
  xhr.send()
}
