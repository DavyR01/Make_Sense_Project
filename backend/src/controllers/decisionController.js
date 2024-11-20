/* eslint-disable prefer-destructuring */
const models = require("../models");

// **************** GET ******************

const browse = async (req, res) => {
  try {
    const [rows] = await models.decision.findAllWithUserId();
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const read = (req, res) => {
  models.decision
    .find(req.params.id)
    .then(([result]) => {
      if (!result[0]) {
        res.sendStatus(404);
        return;
      }
      const decision = result[0];
      // verifier si 404
      models.person_expert
        .getExpertUser(req.params.id)
        .then(([decisionExpert]) => {
          decision.experts = decisionExpert;
          models.person_concern
            .getConcernUser(req.params.id)
            .then(([decisionConcern]) => {
              decision.concerns = decisionConcern;
              models.comment
                .getComments(req.params.id)
                .then(([decisionComments]) => {
                  decision.comments = decisionComments;
                  res.send(decision);
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

/* const read = async (req, res) => {
  try {
    const [result] = await models.decision.find(req.params.id);

    if (!result) {
      res.sendStatus(404);
      return;
    }

    const decision = result;

    const [decisionExpert] = await models.person_expert.getExpertUser(
      req.params.id
    );
    decision.experts = decisionExpert;

    const [decisionConcern] = await models.person_concern.getConcernUser(
      req.params.id
    );
    decision.concerns = decisionConcern;

    const [decisionComments] = await models.comment.getComments(req.params.id);
    decision.comments = decisionComments;

    res.send(decision);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
 */
const readByLast = async (req, res) => {
  try {
    const [result] = await models.decision.findLastdecision();

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const readDecisionByUserId = (req, res) => {
  models.decision
    .findByUserId(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// **************** POST ******************

const add = async (req, res) => {
  const decision = req.body;
  const experts = req.body.person_expert;
  const concerns = req.body.person_concern;
  const notif = req.body.notif;

  try {
    const [result] = await models.decision.insert(decision);
    await models.person_expert.insert(result.insertId, experts);
    await models.person_concern.insert(result.insertId, concerns);
    await models.notification.insert(result.insertId, notif);

    res.location(`/decision/${result.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

/* const add = (req, res) => {
  const decision = req.body;
  const experts = req.body.person_expert;
  const concerns = req.body.person_concern;
  const notif = req.body.notif;

  // TODO validations (length, format...)
  models.decision
    .insert(decision)
    .then(([result]) => {
      models.person_expert
        .insert(result.insertId, experts)
        .then(() => {
          models.person_concern
            .insert(result.insertId, concerns)
            .then(() => {
              models.notification
                .insert(result.insertId, notif)
                .then(() => {
                  res.location(`/decision/${result.insertId}`).sendStatus(201);
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
}; */

// **************** PUT ******************

const edit = async (req, res) => {
  try {
    const decision = req.body;
    const expert = req.body.person_expert;
    const concern = req.body.person_concern;

    decision.id = parseInt(req.params.id, 10);

    const [result] = await models.decision.updateById(decision);

    await models.person_expert.deleteExpert(decision.id);
    await models.person_concern.deleteConcern(decision.id);

    if (result.affectedRows === 0) {
      res.sendStatus(404);
      return;
    }

    await models.person_expert.insert(decision.id, expert);
    await models.person_concern.insert(decision.id, concern);

    res.location(`/decision/${decision.insertId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// **************** DELETE ******************

const destroy = async (req, res) => {
  try {
    const decisionId = parseInt(req.params.id, 10);

    await models.decision.delete(decisionId);
    await models.person_concern.deleteConcern(decisionId);
    await models.person_expert.deleteExpert(decisionId);
    await models.comment.deleteCommentByDecisionId(decisionId);
    await models.notification.deleteNotificationByDecisionId(decisionId);

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// const destroy = (req, res) => {
//   const decisionId = parseInt(req.params.id, 10);
//   models.person_concern.deleteConcern(decisionId).then(() => {
//     models.person_expert.deleteExpert(decisionId).then(() => {
//       models.comment
//         .deleteCommentByDecisionId(decisionId)
//         .then(() => {
//           models.notification
//             .deleteNotificationByDecisionId(decisionId)
//             .then(() => {
//               models.decision
//                 .delete(decisionId)
//                 .then(() => {
//                   res.sendStatus(204);
//                 })
//                 .catch((err) => {
//                   console.error(err);
//                   res.sendStatus(500);
//                 });
//             })
//             .catch((err) => {
//               console.error(err);
//               res.sendStatus(500);
//             });
//         })
//         .catch((err) => {
//           console.error(err);
//           res.sendStatus(500);
//         });
//     });
//   });
// };

// ***************** GESTION AUTOUPDATE STATUS ****************

// Put every decision_id from result in an array to pass to manager
const idsDecisionsOnlyPour = (result) => {
  const ids = [];
  for (const element of result) {
    ids.push(element.decision_id);
  }
  return ids;
};

// update status decision to "terminee depending on date and vote"
const autoUpdateStatusTDecisionTermineeByDateAndVote = (req, res) => {
  models.decision.findIdByVoteAndDateDecisionPour().then(([result]) => {
    models.decision
      .updateStatusTerminee(idsDecisionsOnlyPour(result))
      .then(() => {
        if (res) {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        if (res) {
          res.sendStatus(500);
        }
      })
      .catch((err) => {
        console.error(err);
        if (res) {
          res.sendStatus(500);
        }
      });
  });
};

// const autoUpdateStatusTDecisionTermineeByDateAndVote = async (req, res) => {
//   try {
//     const [result] = await models.decision.findIdByVoteAndDateDecisionPour();
//     await models.decision.updateStatusTerminee(idsDecisionsOnlyPour(result));

//     if (res) {
//       res.sendStatus(204);
//     }
//   } catch (err) {
//     console.error(err);

//     if (res) {
//       res.sendStatus(500);
//     }
//   }
// };

// Put every decision_id from result in an array to pass to manager
const idsDecisionsContre = (result) => {
  const ids = [];
  for (const element of result) {
    ids.push(element.decision_id);
  }
  return ids;
};

// update status decision to "non aboutie depending on date and vote"
const autoUpdateStatusTDecisionNonAboutieByDateAndVote = (req, res) => {
  models.decision.findIdByVoteAndDateDecisionContre().then(([result]) => {
    models.decision
      .updateStatusNonAboutie(idsDecisionsContre(result))
      .then(() => {
        if (res) {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        if (res) {
          res.sendStatus(500);
        }
      })
      .catch((err) => {
        console.error(err);
        if (res) {
          res.sendStatus(500);
        }
      });
  });
};

// la fonction autoUpdateStatusTDecisionNonAboutieByDateAndVote exécute une requête SQL pour récupérer les identifiants des décisions ayant reçu des votes "Contre" dans les trois derniers mois. Ensuite, elle utilise ces identifiants pour mettre à jour le statut de ces décisions en tant que "Non aboutie" dans la base de données.

// ****************************************************************************************************************************************************************

// update status decision to "terminee" depending on date_conflict (end of decision)
const autoUpdateStatusTermineeWithDateConflict = (req, res) => {
  models.decision
    .updateStatusTermineeByDateConflict()
    .then(() => {
      if (res) {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      if (res) {
        res.sendStatus(500);
      }
    });
};

// update status decision to "non aboutie" depending on date_conflict (end of decision)
const autoUpdateStatusNonAboutieWithDateConflict = (req, res) => {
  models.decision
    .updateStatusNonAboutieByDateConflict()
    .then(() => {
      if (res) {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      if (res) {
        res.sendStatus(500);
      }
    });
};

// execute functions every X minutes
setInterval(autoUpdateStatusNonAboutieWithDateConflict, 5000 * 60);
setInterval(autoUpdateStatusTermineeWithDateConflict, 5000 * 60);
setInterval(autoUpdateStatusTDecisionNonAboutieByDateAndVote, 5000 * 60);
setInterval(autoUpdateStatusTDecisionTermineeByDateAndVote, 5000 * 60);

// ******************* GESTION PAGINATION ***********************

// search decision by page (in front)
const browseByPageAndFilter = (req, res) => {
  const page = parseInt(req.query.currentPageUs, 10);
  const limit = parseInt(req.query.decisionPerPageUs, 10);
  const offset = (page - 1) * limit;
  const status = req.query.statusUs;

  models.decision
    .findNbOfDecisions(status)
    .then(([nbDecision]) => {
      if (nbDecision[0].nbDecision === 0) {
        res.send({ rows: [], nbDecision: nbDecision[0] });
      } else {
        models.decision
          .findByPageAndFilter(limit, offset, status)
          .then(([rows]) => {
            if (rows[0] == null) {
              res.sendStatus(404);
            } else {
              res.send({ rows, nbDecision: nbDecision[0] });
            }
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    })

    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// search all decision for admin
const browseAllByPageAndFilter = (req, res) => {
  const page = parseInt(req.query.currentPageAd, 20);
  const limit = parseInt(req.query.decisionPerPageAd, 20);
  const offset = (page - 1) * limit;

  models.decision
    .findAllNbOfDecisions()
    .then(([nbDecision]) => {
      if (nbDecision[0].nbDecision === 0) {
        res.send({ rows: [], nbDecision: nbDecision[0] });
      } else {
        models.decision
          .findAllByPageAndFilter(limit, offset)
          .then(([results]) => {
            if (results[0] == null) {
              res.sendStatus(404);
            } else {
              const decisions = [];
              results.forEach((result) => {
                let decision = decisions.find(
                  (element) => element.decisionId === result.decisionId
                );
                if (decision === undefined) {
                  decision = {
                    ...result,
                    personExpert: [],
                    personConcerne: [],
                  };
                  decisions.push(decision);
                }
                if (
                  !decision.personExpert.some(
                    (element) => element.expertedId === result.expertedId
                  )
                ) {
                  decision.personExpert.push({
                    expertedId: result.expertedId,
                    lastname: result.expertedLastname,
                    firstname: result.expertedFirstname,
                  });
                }
                if (
                  !decision.personConcerne.some(
                    (element) => element.concernedId === result.concernedId
                  )
                ) {
                  decision.personConcerne.push({
                    concernedId: result.concernedId,
                    lastname: result.concernedLastname,
                    firstname: result.concernedFirstname,
                  });
                }
              });
              res.send({ rows: decisions, nbDecision: nbDecision[0] });
            }
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    })

    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  add,
  destroy,
  edit,
  readDecisionByUserId,
  readByLast,
  autoUpdateStatusTDecisionTermineeByDateAndVote,
  autoUpdateStatusTDecisionNonAboutieByDateAndVote,
  autoUpdateStatusTermineeWithDateConflict,
  autoUpdateStatusNonAboutieWithDateConflict,
  browseByPageAndFilter,
  browseAllByPageAndFilter,
};
