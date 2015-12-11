angular.module('avenueWarrior', [])

.controller('FightController', function($scope) {

  // $scope.name = "Christoph";

  function Warrior(name, hp, normal, special, image) {
    return {
      name: name,
      hp: hp,
      normal: normal,
      special: special,
      normalAttack: function(enemy) {

        if (this.criticalHit()) {
          enemy.hp -= (this.normal.damage * 2);
          // alert("It was a Critical Hit!");
        }

        $("#" + this.name.toLowerCase() + "-img").addClass("shake animated");

        $("#" + this.name.toLowerCase() + "-img").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $(this).removeClass("shake animated");
        });

        enemy.hp -= this.normal.damage;

        if (enemy.hp < 1) enemy.hp = 0;

        $("#" + enemy.name.toLowerCase() + "HP").text(enemy.hp);
        checkDeath(enemy);
      },
      criticalHit: function() {
        var randomNumber = Math.floor(Math.random() * (10)) + 1;
        return randomNumber > 8;
      },
      img: image
    };
  }

  function checkDeath(warrior) {
    if (warrior.hp < 1) {
      $("#" + warrior.name.toLowerCase() + "-img").attr("src", "http://blogs-images.forbes.com/merrillbarr/files/2014/03/the-walking-dead.jpg");
      $(".btn").attr("disabled", true);
    }
  }

  var archer = Warrior("Archer", 100, {
    name: "shoot",
    damage: 7,
    mana: 10
  }, {
    name: "blast",
    damage: 15,
    mana: 5
  }, "http://www.emmys.com/sites/default/files/styles/show_detail/public/archer-logo-600x600.jpg?itok=cM24eDUF");

  var thor = Warrior("Thor", 120, {
    name: "hammertime",
    damage: 6
  }, {
    name: "thunder bolt",
    damage: 20
  }, "http://cdn1.vox-cdn.com/uploads/chorus_asset/file/2317228/Thor_Goddess_of_Thunder_Character_Art.0.png");

  var link = Warrior("Link", 150, {
    name: "slash",
    damage: 5
  }, {
    name: "boomerang",
    damage: 9
  }, "http://vignette4.wikia.nocookie.net/zelda/images/6/6b/Link_utilizando_m%C3%A1scaras_artwork_MM_3D.png/revision/latest?cb=20141107152446&path-prefix=es"
);

$scope.warriors = [archer, thor, link];









});