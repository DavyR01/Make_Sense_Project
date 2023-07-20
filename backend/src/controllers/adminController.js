/* eslint-disable prefer-destructuring */
const models = require("../models");

const browseCount = (req, res) => {
  models.user
    .getNumberOfUser()
    .then(([result]) => {
      if (!result[0]) {
        res.sendStatus(404);
        return;
      }
      const stat = result[0];

      models.decision
        .getNumberOfDecision()
        .then(([resultdecision]) => {
          stat.decision = resultdecision[0].decisions;

          models.decision
            .getNumberOfDecisionAccepted()
            .then(([resultdecisionfinished]) => {
              stat.finished = resultdecisionfinished[0].decisionsAccepted;
              models.decision
                .getNumberOfDecisionInProgress()
                .then(([resultprogress]) => {
                  stat.inprogress = resultprogress[0].decisionsInProgress;
                  models.decision
                    .getNumberOfDecisionConflict()
                    .then(([resultconflict]) => {
                      stat.conflict = resultconflict[0].decisionsconflict;
                      models.decision
                        .getNumberOfDecisionUnresolved()
                        .then(([resultunresolved]) => {
                          stat.unresolved =
                            resultunresolved[0].decisionsunresolved;
                          res.send(stat);
                        })
                        .catch((err) => {
                          console.error(err);
                          res.sendStatus(500);
                        });
                    })
                    .catch((err) => {
                      console.error(err);
                      res.sendStatus(500);
                    });
                })
                .catch((err) => {
                  console.error(err);
                  res.sendStatus(500);
                });
            })
            .catch((err) => {
              console.error(err);
              res.sendStatus(500);
            });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browseCount,
};
