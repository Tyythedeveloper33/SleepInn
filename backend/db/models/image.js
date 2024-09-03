"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsToMany(models.Review, {
        through: "ReviewImages",
        foreignKey: "imageId",
        otherKey: "reviewId",
      });

      Image.belongsTo(models.Spot, {
        foreignKey: "spotId",
      });

      Image.belongsTo(models.User, {
        foreignKey: "ownerId",
      });
    }
  }
  Image.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      spotId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Spots",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      reviewId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Reviews",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
