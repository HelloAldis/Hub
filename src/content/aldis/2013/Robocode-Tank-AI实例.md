---
title: Robocode Tank AI实例
publishDate: 2013-01-31 23:51:55
image: ~/assets/images/aldis/2013/2.png
category: 编程思想
tags:
  - Robocode
  - AI
  - Java
---

最近公司流行玩Robocode，这是一个坦克机器人战斗仿真引擎，里面可以写一些自己的Tank来互相战斗。

主要是使用了躲避子弹和避墙的思想

<!-- more -->

```java
package azrael;

import robocode.*;
//import java.awt.Color;

// API help : http://robocode.sourceforge.net/docs/robocode/robocode/Robot.html

/**
 * Aldis - a robot by (your name here)
 */
public class Aldis extends AdvancedRobot {
    double previousEnergy = 100;
    int movementDirection = 1;
    int gunDirection = 1;
    int direction = 1;

    /**
     * run: Aldis's default behavior
     */
    public void run() {
        while (true) {
            setTurnRightRadiansOptimal(adjustHeadingForWalls(0));
            setAhead(100);
            execute();
        }
    }

    private static final double DOUBLE_PI = (Math.PI * 2);
    private static final double HALF_PI = (Math.PI / 2);
    private static final double WALL_AVOID_INTERVAL = 10;
    private static final double WALL_AVOID_FACTORS = 20;
    private static final double WALL_AVOID_DISTANCE = (WALL_AVOID_INTERVAL * WALL_AVOID_FACTORS);

    public double calculateBearingToXYRadians(double sourceX, double sourceY,
            double sourceHeading, double targetX, double targetY) {
                return normalizeRelativeAngleRadians(
                   Math.atan2((targetX - sourceX), (targetY - sourceY)) -
                       sourceHeading);
            }
        public double normalizeAbsoluteAngleRadians(double angle) {
           if (angle < 0) {
                return (DOUBLE_PI + (angle % DOUBLE_PI));
            } else {
                return (angle % DOUBLE_PI);
            }
        }
        public static double normalizeRelativeAngleRadians(double angle) {
            double trimmedAngle = (angle % DOUBLE_PI);
            if (trimmedAngle > Math.PI) {
                return -(Math.PI - (trimmedAngle % Math.PI));
            } else if (trimmedAngle < -Math.PI) {
                return (Math.PI + (trimmedAngle % Math.PI));
            } else {
                return trimmedAngle;
            }
        }

    private double adjustHeadingForWalls(double heading) {
        double fieldHeight = getBattleFieldHeight();
        double fieldWidth = getBattleFieldWidth();
        double centerX = (fieldWidth / 2);
        double centerY = (fieldHeight / 2);
        double currentHeading = getRelativeHeadingRadians();
        double x = getX();
        double y = getY();
        boolean nearWall = false;
        double desiredX;
        double desiredY;
        // If we are too close to a wall, calculate a course toward
        // the center of the battlefield.
        if ((y < WALL_AVOID_DISTANCE)
                || ((fieldHeight - y) < WALL_AVOID_DISTANCE)) {
            desiredY = centerY;
            nearWall = true;
        } else {
            desiredY = y;
        }
        if ((x < WALL_AVOID_DISTANCE)
                || ((fieldWidth - x) < WALL_AVOID_DISTANCE)) {
            desiredX = centerX;
            nearWall = true;
        } else {
            desiredX = x;
        }
        // Determine the safe heading and factor it in with the desired
        // heading if the bot is near a wall
        if (nearWall) {
            double desiredBearing = calculateBearingToXYRadians(x, y,
                    currentHeading, desiredX, desiredY);
            double distanceToWall = Math.min(Math.min(x, (fieldWidth - x)),
                    Math.min(y, (fieldHeight - y)));
            int wallFactor = (int) Math.min(
                    (distanceToWall / WALL_AVOID_INTERVAL), WALL_AVOID_FACTORS);
            return ((((WALL_AVOID_FACTORS - wallFactor) * desiredBearing) + (wallFactor * heading)) / WALL_AVOID_FACTORS);
        } else {
            return heading;
        }
    }

    public double getRelativeHeadingRadians() {
        double relativeHeading = getHeadingRadians();
        if (direction < 1) {
            relativeHeading = normalizeAbsoluteAngleRadians(relativeHeading
                    + Math.PI);
        }
        return relativeHeading;
    }

    public void reverseDirection() {
        double distance = (getDistanceRemaining() * direction);
        direction *= -1;
        setAhead(distance);
    }

    public void setAhead(double distance) {
        double relativeDistance = (distance * direction);
        super.setAhead(relativeDistance);
        if (distance < 0) {
            direction *= -1;
        }
    }

    public void setBack(double distance) {
        double relativeDistance = (distance * direction);
        super.setBack(relativeDistance);
        if (distance > 0) {
            direction *= -1;
        }
    }

    public void setTurnLeftRadiansOptimal(double angle) {
        double turn = normalizeRelativeAngleRadians(angle);
        if (Math.abs(turn) > HALF_PI) {
            reverseDirection();
            if (turn < 0) {
                turn = (HALF_PI + (turn % HALF_PI));
            } else if (turn > 0) {
                turn = -(HALF_PI - (turn % HALF_PI));
            }
        }
        setTurnLeftRadians(turn);
    }

    public void setTurnRightRadiansOptimal(double angle) {
        double turn = normalizeRelativeAngleRadians(angle);
        if (Math.abs(turn) > HALF_PI) {
            reverseDirection();
            if (turn < 0) {
                turn = (HALF_PI + (turn % HALF_PI));
            } else if (turn > 0) {
                turn = -(HALF_PI - (turn % HALF_PI));
            }
        }
        setTurnRightRadians(turn);
    }

    /**
     * onScannedRobot: What to do when you see another robot
     */
    public void onScannedRobot(ScannedRobotEvent e) {
        // Stay at right angles to the opponent
        fire(2);
        setTurnRight(e.getBearing() + 90 - 30 * movementDirection);

        // If the bot has small energy drop,
        // assume it fired
        double changeInEnergy = previousEnergy - e.getEnergy();
        if (changeInEnergy > 0 && changeInEnergy <= 3) {
            // Dodge!
            movementDirection = -movementDirection;
            setAhead((e.getDistance() / 4 + 25) * movementDirection);
        }
        // When a bot is spotted,
        // sweep the gun and radar
        gunDirection = -gunDirection;
        setTurnGunRight(99999 * gunDirection);

        // Fire directly at target
        // fire( 2 ) ;

        // Track the energy level
        previousEnergy = e.getEnergy();
    }
}

```
