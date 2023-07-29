/* eslint-disable prefer-destructuring */
const models = require("../models");

// *************************************************** GET *******************************************************************

// Utilisé pour afficher les décisions sur la page d'accueil
const readAll = async (req, res) => {
  try {
    const [rows] = await models.decision.findAll();
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Affichage d'une décision avec ID
const readOne = (req, res) => {
  models.decision
    .find(req.params.id)
    .then(([result]) => {
      if (!result[0]) {
        res.sendStatus(404);
        return;
      }
      const decision = result[0];
      res.send(decision);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readByLast = async (req, res) => {
  try {
    const [result] = await models.decision.findLast();

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Permet d'afficher les données d'une décision selon l'ID (utilisé sur le profil d'un user)
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

// *************************************************** POST *******************************************************************

const add = (req, res) => {
  const decision = req.body;

  models.decision
    .insert(decision)
    .then(([result]) => {
      res.location(`/decision/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// *************************************************** PUT *******************************************************************

const edit = (req, res) => {
  const decision = req.body;
  decision.id = parseInt(req.params.id, 10);

  models.decision
    .update(decision)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.location(`/decision/${decision.insertId}`).sendStatus(201);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// *************************************************** DELETE *******************************************************************

// Dans cette fonction, on utilise la méthode delete directement sans passer par le fichier manager
const destroy = (req, res) => {
  const decisionId = parseInt(req.params.id, 10);
  models.decision
    .delete(decisionId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// ******************************************************** GESTION AUTOUPDATE STATUS *************************************************************************************************************

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

// execute function 2 minutes
setInterval(autoUpdateStatusTDecisionTermineeByDateAndVote, 1000 * 60 * 8);

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

// execute function 2 minutes
setInterval(autoUpdateStatusTDecisionNonAboutieByDateAndVote, 1000 * 60 * 8);

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

// execute function 2 minutes
setInterval(autoUpdateStatusTermineeWithDateConflict, 1000 * 60 * 8);

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

// execute function 2 minutes
setInterval(autoUpdateStatusNonAboutieWithDateConflict, 1000 * 60 * 8);

// *********************************************************** GESTION PAGINATION *****************************************************************************************************

// search decision by page (in front)
const readAllByPageAndFilter = (req, res) => {
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
  readAll,
  readOne,
  add,
  destroy,
  edit,
  readDecisionByUserId,
  readByLast,
  autoUpdateStatusTDecisionTermineeByDateAndVote,
  autoUpdateStatusTDecisionNonAboutieByDateAndVote,
  autoUpdateStatusTermineeWithDateConflict,
  autoUpdateStatusNonAboutieWithDateConflict,
  readAllByPageAndFilter,
  browseAllByPageAndFilter,
};
