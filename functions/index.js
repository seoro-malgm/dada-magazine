/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// const admin = require("firebase-admin");
// admin.initializeApp();

// const firestore = admin.firestore();
// function calculatePopularityScore(likeCount, reportCount, viewerCount) {
//   const likeWeight = 0.7;
//   const reportWeight = 0.3;
//   const viewerWeight = 0.5;

//   const popularityScore =
//     likeCount * likeWeight -
//     reportCount * reportWeight +
//     viewerCount * viewerWeight;

//   return popularityScore;
// }

// exports.calculatePopularity = onRequest(async (request, response) => {
//   const userId = request.query.userId;

//   try {
//     // Firestore에서 해당 유저의 정보를 가져옵니다.
//     const userDocRef = firestore.collection("users").doc(userId);
//     const userSnapshot = await userDocRef.get();
//     const userData = userSnapshot.data();

//     if (!userData) {
//       throw new Error("User not found.");
//     }

//     const likeCount = userData.like || 0;
//     const reportCount = userData.report || 0;
//     const viewerCount = userData.viewer || 0;

//     // 인기도를 계산합니다.
//     const popularity = calculatePopularityScore(
//       likeCount,
//       reportCount,
//       viewerCount
//     );

//     // Firestore에 '인기도(popularity)' 값을 업데이트합니다.
//     await userDocRef.update({ popularity });

//     response.send(
//       `Popularity for user ${userId} has been updated to ${popularity}.`
//     );
//   } catch (error) {
//     console.error("Error calculating popularity:", error);
//     response
//       .status(500)
//       .send("An error occurred while calculating popularity.");
//   }
// });
