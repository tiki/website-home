"use strict";

const helpers = require("../../utils/helpers.js");
const sendgrid = require("../../utils/sendgrid");

exports.handler = function (event, context, callback) {
  if (event.body == null) callback(null, helpers.badRequest());

  const body = JSON.parse(event.body);
  if (body.email == null || !helpers.isEmail(body.email))
    callback(null, helpers.badRequest());

  body.email = helpers.sanitizeString(body.email);
  body.referrer = helpers.sanitizeString(body.referrer);

  sendgrid.update(
    {
      email: body.email,
      referrer: body.referrer,
      participate: body.participate,
      confirmed: body.confirmed,
    },
    function (err, data) {
      if (err) console.log(err, err.stack);
      if (data && helpers.is2xx(data.code)) {
        callback(null, {
          statusCode: "200",
          headers: helpers.corsHeaders(),
          body: JSON.stringify({
            email: helpers.obfuscateEmail(body.email),
            referrer: body.referrer,
            participate: body.participate,
            confirmed: body.confirmed,
          }),
        });
      } else callback(null, helpers.badRequest());
    }
  );
};
