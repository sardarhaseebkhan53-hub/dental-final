/**
 * Risk Center & Position Sizer
 * Calculates mathematical position sizing and risk exposure metrics.
 */

const { getPortfolio } = require("./portfolio");
const marketState = require("./marketState");

function calculatePositionSize(params) {
  const {
    accountSize = 50000,
    riskPercentage = 1.0, // e.g. 1%
    entryPrice,
    stopLossPrice,
    leverage = 1,
  } = params;

  if (!entryPrice || !stopLossPrice || entryPrice <= 0 || stopLossPrice <= 0) {
    throw new Error("Valid positive entryPrice and stopLossPrice are required.");
  }

  const stopDistance = Math.abs(entryPrice - stopLossPrice);
  const stopDistancePercent = (stopDistance / entryPrice) * 100;

  if (stopDistance === 0) {
    throw new Error("Stop loss cannot equal entry price.");
  }

  // Maximum $ amount to risk
  const maxRiskAmount = (accountSize * (riskPercentage / 100));

  // Quantity = Max Risk $ / Stop Distance
  const positionQuantity = maxRiskAmount / stopDistance;
  const positionValue = positionQuantity * entryPrice;
  const marginRequired = positionValue / leverage;

  return {
    accountSize,
    riskPercentage,
    maxRiskAmount: Number(maxRiskAmount.toFixed(2)),
    entryPrice: Number(entryPrice.toFixed(4)),
    stopLossPrice: Number(stopLossPrice.toFixed(4)),
    stopDistance: Number(stopDistance.toFixed(4)),
    stopDistancePercent: Number(stopDistancePercent.toFixed(2)),
    suggestedQuantity: Number(positionQuantity.toFixed(4)),
    suggestedPositionValue: Number(positionValue.toFixed(2)),
    suggestedMarginRequired: Number(marginRequired.toFixed(2)),
    leverage,
    disclaimer: "Suggested calculation model for risk management. Does NOT constitute auto-executed trade or guaranteed profit.",
  };
}

function getRiskOverview(userId = "default_user") {
  const portfolio = getPortfolio(userId);
  const { totalValue, totalExposure, positions } = portfolio;

  let maxSinglePositionExposure = 0;
  let highestConcentrationAsset = "NONE";

  for (const p of positions) {
    if (p.positionValue > maxSinglePositionExposure) {
      maxSinglePositionExposure = p.positionValue;
      highestConcentrationAsset = p.symbol;
    }
  }

  const portfolioConcentration = totalValue > 0 ? (maxSinglePositionExposure / totalValue) * 100 : 0;
  const overallLeverage = totalValue > 0 ? totalExposure / totalValue : 0;

  let riskLevel = "LOW";
  if (portfolioConcentration > 40 || overallLeverage > 1.5) riskLevel = "HIGH";
  else if (portfolioConcentration > 20 || overallLeverage > 1.0) riskLevel = "MEDIUM";

  return {
    totalPortfolioValue: totalValue,
    totalExposure,
    portfolioConcentrationPercent: Number(portfolioConcentration.toFixed(2)),
    highestConcentrationAsset,
    overallLeverageRatio: Number(overallLeverage.toFixed(2)),
    riskLevel,
    riskAssessmentNotes: `Largest single asset allocation is ${highestConcentrationAsset} (${portfolioConcentration.toFixed(1)}% of portfolio). Overall leverage ratio is ${overallLeverage.toFixed(2)}x.`,
  };
}

module.exports = {
  calculatePositionSize,
  getRiskOverview,
};
